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
        <div className="border border-gray-300 px-5 pb-5 shadow-sm">
          <span className="pl-16 text-sm">{`Replying to `}</span>
          <span className="text-sm text-blue-500">{`@${data.author.username}`}</span>
          <CreatePostWizard
            defaultText="Post your reply"
            parentId={data.post.id}
          />
        </div>
        <Feed parentId={id} direction="forward" />
      </PageLayout>
    </>
  );
};

import type { GetStaticProps } from "next";
import { generateSSHelper } from "~/server/helpers/ssgHelper";
import { CreatePostWizard } from "~/components/post-wizard";
import Feed from "~/components/feed";

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
