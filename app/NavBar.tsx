import { IconBugFilled } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const NavBar = () => {
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
          <li>
            <Link
              key={link.url}
              href={link.url}
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
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
