import type { NextPage } from "next";
import Head from "next/head";
import { PageLayout } from "~/components/layout";
import { PostView } from "~/components/postview";
import { api } from "~/utils/api";

export const SinglePostPage: NextPage<{ id: string }> = ({ id }) => {
  const { data } = api.posts.getById.useQuery({
    id,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{`${data.post.content} - @${data.author.username}`}</title>
      </Head>
      <PageLayout>
        <PostView {...data} />
      </PageLayout>
    </>
  );
};

import type { GetStaticProps } from "next";
import { generateSSHelper } from "~/server/helpers/ssgHelper";

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = generateSSHelper();

  const id = context.params?.id;

  if (typeof id !== "string") throw new Error("no id");

  await helpers.posts.getById.prefetch({ id });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      id,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default SinglePostPage;
