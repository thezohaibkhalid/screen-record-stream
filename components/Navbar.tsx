"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Navbar = () => {
  const user = {};
  const router = useRouter();
  return (
    <header className="navbar">
      <nav>
        <Link href={"/"}>
          <Image
            src="/assets/icons/logo.svg"
            alt="BitRecord Logo"
            width={32}
            height={32}
          />
          <h1>BitRecord</h1>
        </Link>
        {user && (
          <figure>
            <button>
              <Image
                src="/assets/images/dummy.jpg"
                alt="User Avatar"
                width={36}
                height={36}
                className="rounded-full aspect-square "
                onClick={() => {
                  router.push(`/profile/123456`);
                }}
              />
            </button>
            <button className="cursor-pointer ">
              <Image
                src="/assets/icons/logout.svg"
                alt="Logout Icon"
                width={24}
                height={24}
                className="rotate-180 "
              />
            </button>
          </figure>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
