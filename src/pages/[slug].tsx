import Head from "next/head";
import { api } from "~/utils/api";

export const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`@${data.username}`}</title>
      </Head>
      <main className="flex h-screen justify-center">
        <div>{`@${data.username}`}</div>
      </main>
    </>
  );
};

import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetStaticProps, NextPage } from "next";
import superjson from "superjson";
import { appRouter } from "~/server/api/root";
import { db } from "~/server/db";

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default ProfilePage;
