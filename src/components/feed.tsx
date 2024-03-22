import { useEffect } from "react";

import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

import { useInView } from "react-intersection-observer";

const Feed = ({
  parentId,
  direction,
}: {
  parentId?: string;
  direction?: "backward" | "forward";
}) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    api.posts.infinitePosts.useInfiniteQuery(
      {
        parentId,
        direction,
        limit: 10,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      },
    );

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <LoadingPage />;
  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.pages.flatMap((page) =>
        page.items.map((fullPost) => (
          <PostView {...fullPost} key={fullPost.post.id} />
        )),
      )}
      <div ref={ref}>{isFetchingNextPage ? <LoadingPage /> : null}</div>
    </div>
  );
};

export default Feed;
