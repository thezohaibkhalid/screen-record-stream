import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ICONS } from "@/constants/index";
const Header = ({ subHeader, title, userImg }: SharedHeaderProps) => {
  return (
    <header>
      <section className="header-container">
        <div className="details">
          {userImg && (
            <Image
              src={userImg || "/asstes/images/dummy.jpg"}
              alt="User Image"
              width={66}
              height={66}
              className="rounded-full"
            />
          )}
          <article className="article">
            <p>{subHeader}</p>
            <h1>{title}</h1>
          </article>
        </div>
        <aside>
          <Link href={"/upload"}>
            <Image
              src="/assets/icons/upload.svg"
              alt="Upload Icon"
              height={16}
              width={16}
            />
            <span>Upload a Video</span>
          </Link>
          <div className="record">
            <button className="primary-btn">
              <Image src={ICONS.record} alt="Record" width={16} height={16} />
            </button>
          </div>
        </aside>
      </section>
    </header>
  );
};

export default Header;
