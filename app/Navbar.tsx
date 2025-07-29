"use client";
import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useSession } from "next-auth/react";
const Navbar = () => {
  return (
    <nav className=" space-x-4 border-b-2 border-zinc-200 py-3 items-center px-5 transition-colors ">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap="3">
            {" "}
            <Link href="/">
              <AiFillBug />
            </Link>
            <NavbarLink />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const NavbarLink = () => {
  const pathname = usePathname();
  const titles = [
    { title: "Dashboard", href: "/" },
    { title: "Issues", href: "/issues" },
  ];

  return (
    <ul className="flex space-x-4 ">
      {titles.map((item) => (
        <li
          className={classnames({
            "!text-zinc-900": item.href === pathname,
            "navbar-link": true,
          })}
          key={item.href}
        >
          <Link href={item.href}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
};

const AuthStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") null;
  if (status === "unauthenticated") {
    return (
      <Link className="navbar-link" href="/api/auth/signin">
        Login
      </Link>
    );
  }

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <button
              type="button"
              className="bg-transparent border-none p-0 focus:outline-none focus:ring-0"
            >
              <Avatar
                className="cursor-pointer"
                radius="full"
                src={session.user?.image || undefined}
                fallback={session.user?.name?.[0]?.toUpperCase() || "?"}
              />
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Logout</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
    </Box>
  );
};

export default Navbar;
