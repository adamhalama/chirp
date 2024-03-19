import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import Feed from "~/components/feed";

import { PageLayout } from "~/components/layout";
import { CreatePostWizard } from "~/components/post-wizard";
import { api } from "~/utils/api";

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
