import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import router from "next/router";
import { type RouterOutputs } from "~/utils/api";
import AnimatedIcon from "./icons/animated-icon";
import CommentIconSvg from "./icons/comment-icon-svg";
import LinkedProfilePicture from "./linked-profile-picture";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

type PostProps = {
  postWithUser: PostWithUser;
};

export const FeedPostView = ({ postWithUser }: PostProps) => {
  const { post, author } = postWithUser;

  const handleNavigate = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      key={post.id}
      onClick={handleNavigate}
      className="post-view-hover flex gap-3 border-b border-slate-400 p-4"
    >
      <div className="flex min-w-max flex-col">
        <LinkedProfilePicture
          username={author.username}
          imageUrl={author.profilePicture}
          pixelCount={48}
        />
      </div>

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

        <div className="group flex pt-4">
          <AnimatedIcon IconComponent={CommentIconSvg} width={18} height={18} />
          <span className="custom-transition-200 select-none pl-1 text-sm text-slate-300 group-hover:text-blue-500">
            {post.children.length}
          </span>
        </div>
      </div>
    </div>
  );
};
