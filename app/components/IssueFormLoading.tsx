import { Box } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const IssueFormLoading = () => {
  return (
    <Box className="max-w-xl ">
      <Skeleton height="2rem" />
      <Skeleton height={"25rem"} />
      <Skeleton width={"5rem"} height="2rem" className="mt-3" />
    </Box>
  );
};

export default IssueFormLoading;
