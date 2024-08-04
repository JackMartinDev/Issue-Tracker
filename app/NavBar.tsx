"use client";
import { IconBugFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import clsx from "clsx";

const NavBar = () => {
  const currentPath = usePathname();

  const links = [
    { url: "/", label: "Dashboard" },
    { url: "/issues", label: "Issues" },
  ];

  return (
    <nav className="flex gap-5 mb-5 p-5 bg-gray-200">
      <Link href="/">
        <IconBugFilled />
      </Link>
      <ul className="flex gap-5">
        {links.map((link) => (
          <li key={link.url}>
            <Link
              href={link.url}
              className={clsx({
                "text-zinc-900": currentPath === link.url,
                "text-zinc-500": currentPath !== link.url,
                "hover:text-zinc-800 transition-colors": true,
              })}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
