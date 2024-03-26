import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LinkedProfilePicture from "./linked-profile-picture";
import router from "next/router";
import AnimatedIcon from "./animated-icon";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getByIdWithParents"][number];

export const PostView = (thread: PostWithUser[]) => {
  console.log("🚀 ~ {thread in postview.tsx~ thread:", thread);

  const threadArray = Object.values(thread);
  return (
    <div>
      {threadArray.map((item, index) => {
        const { post, author } = item;
        const isMainPost = index === thread.length - 1;
        const handleClick = () => router.push(`/post/${post.id}`);

        return (
          <div
            key={post.id}
            onClick={handleClick}
            className={`flex flex-col ${isMainPost ? "" : "ml-4 border-l-2 border-slate-400 pl-4"} my-2`}
          >
            <div className="flex gap-3">
              <LinkedProfilePicture
                username={author.username}
                imageUrl={author.profilePicture}
                size={isMainPost ? 56 : 40}
              />

              <div
                className={`flex flex-col ${isMainPost ? "text-base" : "text-sm"}`}
              >
                <div className="flex gap-1 text-slate-300">
                  <Link
                    href={`/@${author.username}`}
                    className="hover:underline"
                  >
                    <span>{`@${author.username}`}</span>
                  </Link>
                  <span>{` ·`}</span>
                  <span className="font-thin">
                    {dayjs(post.createdAt).fromNow()}
                  </span>
                </div>

                <span>{post.content}</span>

                {isMainPost && (
                  <div className="flex pt-2">
                    <AnimatedIcon
                      src="/icons/comment.svg"
                      alt="comment"
                      width={18}
                      height={18}
                      count={post.children.length}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
