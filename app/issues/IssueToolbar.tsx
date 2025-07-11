import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueToolbar = () => {
  return (
    <>
      <div className="mb-4">
        <Button>
          <Link href="/issues/newissue">new issue</Link>
        </Button>
      </div>
    </>
  );
};

export default IssueToolbar;
