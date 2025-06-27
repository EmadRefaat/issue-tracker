"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
const Navbar = () => {
  const pathname = usePathname();

  const titles = [
    { title: "Dashboard", href: "/" },
    { title: "Issues", href: "/issues" },
  ];

  return (
    <nav className="flex space-x-4 border-b-2 border-zinc-200 h-14 items-center px-5 transition-colors ">
      <Link href="/">
        <AiFillBug />
      </Link>
      <ul className="flex space-x-4 ">
        {titles.map((item) => (
          <li
            className={classnames({
              "text-zinc-900": item.href === pathname,
              "text-zinc-400": item.href !== pathname,
              "hover:text-zinc-800 transition-colors": true,
            })}
            key={item.href}
          >
            <Link href={item.href}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
