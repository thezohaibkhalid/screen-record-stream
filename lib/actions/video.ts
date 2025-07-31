"use server"
import { auth } from "@/lib/auth";
import {apiFetch, doesTitleMatch, getEnv, getOrderByClause, withErrorHandling} from "../utils"
import { headers } from "next/headers";
import { BUNNY } from "@/constants";
import {db} from "@/drizzle/db"
import {videos} from "@/drizzle/schema";
import {revalidatePath} from "next/cache";
import aj , {fixedWindow, request} from "@/lib/arcjet"
import {or, eq, and, sql} from "drizzle-orm"
import {user} from "@/drizzle/schema"

const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_VIDEO_LIBRARY_ID = getEnv("BUNNY_VIDEO_LIBRARY_ID");
const ACCESS_KEYS = {
    streamAccessKey: getEnv("BUNNY_STREAM_ACCESS_KEY"),
    storageAccessKey: getEnv("BUNNY_STORAGE_ACCESS_KEY"),
}

//Helper funcitons 
const getSessionUserId = async (): Promise<string> => {
    const session = await auth.api.getSession({headers: await headers()});
    if (!session ) throw new Error("User not authenticated");
    return session.user.id;
}
//Revalidating the path to get the updated items
const revalidatePaths = (paths: string[]) => {
    paths.forEach(path => {
        revalidatePath(path);
    })
}

//reusable validator funciton to rate limit some of our server actions
//to protect from spaming or tem Mails (do not allow more then 2 videos in a minute for example)vi
const validateWithArcjet = async (fingerPrint: string) => {
    const rateLimit = aj.withRule(
        fixedWindow({
            mode: "LIVE",
            window: "1m",
            max: 2,
            characteristics: ["fingerprint"],
        })
    );
    const req = await request();
    const decision = await rateLimit.protect(req, { fingerprint: fingerPrint });
    if (decision.isDenied()) {
        throw new Error("Rate Limit Exceeded");
    }
};
const buildVideoWithUserQuery = ()=>{
    return db.select({
        video:videos,
        user:{id:user.id, name:user.name,image:user.image}
    })
        .from(videos)
        .leftJoin(user,eq(videos.userId, user.id))
}





//server functino
export const getVideoUploadUrl = withErrorHandling(async()=>{
    await getSessionUserId();
    const videoResponse = await apiFetch<BunnyVideoResponse>(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_VIDEO_LIBRARY_ID}/videos`,
        {
        method: "POST",
        bunnyType:"stream",
        body:{title:"New Video", collectionId:""},
    },     )
    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_VIDEO_LIBRARY_ID}/videos/${videoResponse.guid}`
    return {
        uploadUrl,
        videoId: videoResponse.guid,
        accessKey: ACCESS_KEYS.streamAccessKey,
    };
}
)

export const getThumbnailUploadUrl = withErrorHandling(async (videoId:string)=>{
    const fileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`;
    return {
        uploadUrl,
        cdnUrl,
        accessKey: ACCESS_KEYS.storageAccessKey,
    };
})


export const saveVideoDetails = withErrorHandling(async(videoDetails:VideoDetails)=>{
    const userId = await getSessionUserId();
    await validateWithArcjet(userId);
    await apiFetch(`${VIDEO_STREAM_BASE_URL}/${BUNNY_VIDEO_LIBRARY_ID}/videos/${videoDetails.videoId}`,{
        method:"POST",
        bunnyType:"stream",
        body: {
            title: videoDetails.title,
            description: videoDetails.description,
        }
    }
    )
    await db.insert(videos).values({
        ...videoDetails,
        videoUrl: `${BUNNY.EMBED_URL}/${BUNNY_VIDEO_LIBRARY_ID}/${videoDetails.videoId}`,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
    })
    revalidatePaths(['/'])
    return {videoId:videoDetails.videoId}
})


export const getAllVideos = withErrorHandling(async(
    searchQuery: string = '',
    sortFilter: string,
    pageNumber: number = 1,
    pageSize: number = 10,
)=>{
    const session = await auth.api.getSession({headers: await headers()});
    const currentUserId  = session?.user.id;
    const canSeeTheVideos = or(
        eq(videos.visibility, 'public'),
        eq(videos.userId, currentUserId!),
    );

    const whereCondition = searchQuery.trim()
    ? and(canSeeTheVideos, doesTitleMatch(videos, searchQuery),)
        :canSeeTheVideos;

    const [{totalCount}] = await db
        .select({totalCount:sql`count(*)`})
        .from(videos).where(whereCondition);

    const totalVideos = Number(totalCount);
    const totalPages = Math.ceil(totalVideos/pageSize)
    // Fetch paginated, sorted results
    const videoRecords = await buildVideoWithUserQuery()
        .where(whereCondition)
        .orderBy(
            sortFilter
                ? getOrderByClause(sortFilter)
                : sql`${videos.createdAt} DESC`
        )
        .limit(pageSize)
        .offset((pageNumber - 1) * pageSize);
        return {
            videos: videoRecords,
            pagination: {
                currentPage: pageNumber,
                totalPages,
                totalVideos,
                pageSize,
            },
        };
    }
);
