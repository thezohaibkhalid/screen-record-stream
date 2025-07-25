"use client";
import Link from "next/link";
import Image from "next/image";

const VideoCard = ({
  id,
  title,
  thumbnail,
  createdAt,
  userImg,
  username,
  views,
  duration,
  visibility,
}: VideoCardProps) => {
  return (
    <Link href={`/video/${id}`} className="video-card">
      <Image
        src={thumbnail}
        alt={title}
        width={290}
        height={160}
        className="thumbnail"
      />
      <article>
        <div>
          <figure>
            <Image
              src={userImg || "/assets/icons/zohaib.png"}
              alt="avatar"
              width={34}
              height={34}
              className="rounded-full aspect-square"
            />
            <figcaption>
              <h3>{username}</h3>
              <p>{visibility}</p>
            </figcaption>
          </figure>
          <aside>
            <Image
              src="/assets/icons/eye.svg"
              alt="views"
              width={16}
              height={16}
              className=""
            />
            <span>{views}</span>
          </aside>
        </div>
        <h2>
          {title} -{" "}
          {createdAt.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </h2>
      </article>
      <button>
        <Image
          src="/assets/icons/link.svg"
          alt="link"
          width={18}
          height={18}
          className="copy-btn"
        />
      </button>
      {duration && (
        <div className="duration">{Math.ceil(duration / 60)} min</div>
      )}
    </Link>
  );
};

export default VideoCard;
