import { useEffect } from "react";

import { LoadingPage } from "~/components/loading";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

import { useInView } from "react-intersection-observer";

const Feed = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    api.posts.infinitePosts.useInfiniteQuery(
      {
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
