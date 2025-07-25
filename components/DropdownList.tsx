"use client";
import { useState } from "react";
import Image from "next/image";

const DropdownList = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div className="cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="filter-trigger">
          <figure>
            <Image
              src="/assets/icons/hamburger.svg"
              alt="menu"
              width={14}
              height={14}
            />
            Most recent
          </figure>
          <Image
            src="/assets/icons/arrow-down.svg"
            alt="arrow down"
            width={20}
            height={20}
          />
        </div>
      </div>
      {isOpen && (
        <div>
          <ul className="dropdown">
            {["Most Recent", "Most Liked"].map((option) => {
              return (
                <li className="list-item" key={option}>
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownList;
