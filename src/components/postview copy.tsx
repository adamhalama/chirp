import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import router from "next/router";
import { type RouterOutputs } from "~/utils/api";
import AnimatedIcon from "./animated-icon";
import CommentSvg from "./icons/comment";
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
      className="custom-transition-200 flex-row gap-3 border-b border-slate-400 p-4 transition-colors hover:bg-gray-900"
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

      <div className="flex border-t border-slate-400 pt-2">
        <div className="px-2">
          <AnimatedIcon
            IconComponent={CommentSvg}
            width={18}
            height={18}
            count={post.children.length}
          />
        </div>
      </div>
    </div>
  );
};
