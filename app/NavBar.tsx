"use client";
import { IconBugFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session} = useSession()

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
      <Box>
        { status === "authenticated" && <Link href="/api/auth/signout">Log out</Link>}
        { status === "unauthenticated" && <Link href="/api/auth/signin">Log in</Link>}
      </Box>
    </nav>
  );
};

export default NavBar;
