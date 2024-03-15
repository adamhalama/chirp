import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/loading";
import { CreatePostWizard } from "~/components/post-wizard";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  if (!data) return <div>Something went wrong</div>;

  return (
    <div className="flex flex-col">
      {data.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export default function Home() {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <PageLayout>
        <div className="border-b border-slate-400 p-4">
          <div className="flex justify-center">
            {!isSignedIn ? <SignInButton /> : <SignOutButton />}
          </div>
          {isSignedIn && <CreatePostWizard />}
        </div>
        <Feed />
      </PageLayout>
    </>
  );
}
