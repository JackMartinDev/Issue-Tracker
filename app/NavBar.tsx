"use client";
import { IconBugFilled } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {
  return (
    <nav className="mb-5 p-5 bg-gray-200 border-b h-16">
      <Container>
        <Flex justify="between">
          <Flex gap="5">
            <Link href="/">
              <IconBugFilled />
            </Link>
            <NavigationLinks />
          </Flex>
          <AuthenticationStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavigationLinks = () => {
  const currentPath = usePathname();

  const links = [
    { url: "/", label: "Dashboard" },
    { url: "/issues", label: "Issues" },
  ];

  return (
    <ul className="flex space-x-6">
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
  );
};

const AuthenticationStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return (
      <Box>
        <Link href="/api/auth/signin">Log in</Link>
      </Box>
    );
  }

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default NavBar;
