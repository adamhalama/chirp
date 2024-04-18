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

export const PostView = ({ postWithUser }: PostProps) => {
  const { post, author } = postWithUser;

  const handleNavigate = () => {
    router.push(`/post/${post.id}`);
  };

  return (
    <div
      key={post.id}
      onClick={handleNavigate}
      className="gap-3 border-b border-slate-400 px-4 transition-colors"
    >
      <div className="flex min-w-max flex-row gap-3 pb-4">
        <LinkedProfilePicture
          username={author.username}
          imageUrl={author.profilePicture}
          pixelCount={56}
        />
        <div className="flex items-center gap-1 text-slate-300">
          <Link href={`/@${author.username}`} className="hover:underline">
            <span>{`@${author.username}`}</span>
          </Link>
          <span>{` ·`}</span>
          <span className="font-thin">
            {`${dayjs(post.createdAt).fromNow()}`}
          </span>
        </div>
      </div>
      <div className="flex pb-4">
        <span>{post.content}</span>
      </div>

      <div className="flex border-t border-slate-400 py-2">
        <div className="group flex px-2">
          <AnimatedIcon IconComponent={CommentIconSvg} width={18} height={18} />
          <span className="custom-transition-200 select-none pl-1 text-sm text-slate-300 group-hover:text-blue-500">
            {post.children.length}
          </span>
        </div>
      </div>
    </div>
  );
};
