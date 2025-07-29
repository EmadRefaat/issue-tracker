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
  const { data: session, status } = useSession();
  const pathname = usePathname();
  console.log("Session data:", session);
  const titles = [
    { title: "Dashboard", href: "/" },
    { title: "Issues", href: "/issues" },
  ];

  return (
    <nav className=" space-x-4 border-b-2 border-zinc-200 py-3 items-center px-5 transition-colors ">
      <Container>
        <Flex justify="between">
          <Flex align={"center"} gap="3">
            {" "}
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    style={{ background: "none", border: "none", padding: 0 }}
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
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin">Login</Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navbar;
