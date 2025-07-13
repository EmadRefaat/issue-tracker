import { Box, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const IssueDetailLoadingPage = () => {
  return (
    <Box className="max-w-2xl ">
      <Skeleton />
      <Flex gap="2" my="2">
        <Skeleton width="2rem" />
        <Skeleton width="4rem" />
      </Flex>
      <Skeleton count={5} />
    </Box>
  );
};

export default IssueDetailLoadingPage;
