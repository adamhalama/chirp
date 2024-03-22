import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LinkedProfilePicture from "./linked-profile-picture";
import Image from "next/image";
import router from "next/router";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  const handleNavigate = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      key={post.id}
      onClick={handleNavigate}
      className="flex gap-3 border-b border-slate-400 p-4 transition-colors duration-200 hover:bg-gray-900"
    >
      <LinkedProfilePicture
        username={author.username}
        imageUrl={author.profilePicture}
        size={56}
      />

      <div className="flex flex-col">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`} className="hover:underline">
            <span>{`@${author.username}`}</span>
          </Link>
          <span>{` ·`}</span>
          <span className="font-thin">
            {`${dayjs(post.createdAt).fromNow()}`}
          </span>
        </div>
        <span>{post.content}</span>
        <div className="group flex gap-1 pt-2">
          <div
            className="rounded-full transition-all duration-300 ease-in-out"
            style={{
              boxShadow: "0 0 20px 10px rgba(59, 130, 246, 0.5)", // Adjust the RGBA values to change the color and opacity
            }}
          >
            <Image
              src="/icons/comment.svg"
              alt="Comment"
              width={20}
              height={20}
            />
          </div>
          <span className="text-sm text-slate-300 group-hover:text-blue-500">
            {post.children.length}
          </span>
        </div>
      </div>
    </div>
  );
};
