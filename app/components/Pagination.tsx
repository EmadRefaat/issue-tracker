import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
  DoubleArrowUpIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  itemCount: number;
  currentPage: number;
  pageSize: number;
}
const Pagination = ({ itemCount, currentPage, pageSize }: Props) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  return (
    <>
      <Flex align={"center"} gap="2">
        <Text>
          page {currentPage} of {pageCount}
        </Text>
        <Button color="gray" variant="soft" disabled={currentPage === 1}>
          <DoubleArrowLeftIcon></DoubleArrowLeftIcon>
        </Button>
        <Button color="gray" variant="soft" disabled={currentPage === 1}>
          <ChevronLeftIcon></ChevronLeftIcon>
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
        >
          <ChevronRightIcon></ChevronRightIcon>
        </Button>
        <Button
          color="gray"
          variant="soft"
          disabled={currentPage === pageCount}
        >
          <DoubleArrowRightIcon></DoubleArrowRightIcon>
        </Button>
      </Flex>
    </>
  );
};

export default Pagination;
