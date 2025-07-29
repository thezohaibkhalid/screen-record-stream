import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";
import aj, {slidingWindow, validateEmail} from "@/lib/arcjet";
import {NextRequest} from "next/server";
import {ArcjetDecision} from "@arcjet/next";
import ip from "@arcjet/ip";
//Email Validation (don't allow unverified spammy or temporary email )  -->Block
//Rate Limit with sliding window of time
const emailValidation = aj.withRule(
    validateEmail(
        {
            mode:"LIVE",
            block:["DISPOSABLE", "INVALID", "NO_MX_RECORDS"]
        }
    )
)
const rateLimit = aj.withRule(
    slidingWindow(
        {
            mode:"LIVE",
            interval:"2m",
            max:2,
            characteristics: ['fingerprint']
        }
    )
)

const protectedAuth = async (req: NextRequest):Promise<ArcjetDecision> => {
    const session = await auth.api.getSession({headers: req.headers})
    let userId: string;
    session?.user?.id ? userId = session.user.id : userId = ip(req) || '127.0.0.1'
    if (req.nextUrl.pathname.startsWith('/api/auth/sign-in')) {
        const body = await req.clone().json();
        if (typeof body.email === "string") {
            return emailValidation.protect(req, {email: body.email})
        }
    }
    return rateLimit.protect(req, {fingerprint: userId});
};
    const authHandlers = toNextJsHandler(auth.handler)
    export const { GET } = toNextJsHandler(auth.handler);

export const POST = async(req: NextRequest) => {
    const decision = await protectedAuth(req);
    if(decision.isDenied()){
        if(decision.reason.isEmail()){
            throw new Error("Email Validation Failed");
        }
        if(decision.reason.isRateLimit()){
            throw new Error("Rate limit Exceeded");
        }
        if(decision.reason.isShield()){
            throw new Error("Shield Turned On protected against Malicious Actions");
        }
    }
}