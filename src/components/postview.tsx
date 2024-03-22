import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LinkedProfilePicture from "./linked-profile-picture";
import Image from "next/image";
import router from "next/router";

dayjs.extend(relativeTime);

const styles = {
  transition: "transition-all duration-200 ease-in-out",
  haloEffect: "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100",
};

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
      className={`${styles.transition} flex gap-3 border-b border-slate-400 p-4 transition-colors hover:bg-gray-900`}
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

        <div className="flex pt-2">
          <div className="group flex">
            <div className="relative inline-block">
              <div
                className={`${styles.haloEffect} ${styles.transition}`}
                style={{
                  boxShadow: "0 0 2px 8px rgba(59, 130, 246, 0.3)", // Halo effect
                  background: "rgba(59, 130, 246, 0.3)", // Subtle background color for the halo
                  mixBlendMode: "screen",
                }}
              ></div>
              <Image
                src="/icons/comment.svg"
                alt="Comment"
                width={18}
                height={18}
                className={`${styles.transition} relative z-10 group-hover:mix-blend-overlay`}
              />
            </div>
            <span
              className={`${styles.transition} pl-1 text-sm text-slate-300 group-hover:text-blue-500`}
            >
              {post.children.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
