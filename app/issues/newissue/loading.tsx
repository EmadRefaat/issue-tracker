import { Box } from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";
const NewIssueLoading = () => {
  return (
    <Box className="max-w-xl ">
      <Skeleton />
      <Skeleton height={"25rem"} />
      <Skeleton width={"5rem"} height="2rem" className="mt-3" />
    </Box>
  );
};

export default NewIssueLoading;
