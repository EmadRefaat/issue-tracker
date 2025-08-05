import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatus from "./IssueStatus";

const IssueToolbar = () => {
  return (
    <>
      <Flex mb="4" justify="between">
        <IssueStatus />
        <Button>
          <Link href="/issues/newissue">new issue</Link>
        </Button>
      </Flex>
    </>
  );
};

export default IssueToolbar;
