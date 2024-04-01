import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import router from "next/router";
import { type RouterOutputs } from "~/utils/api";
import AnimatedIcon from "./animated-icon";
import LinkedProfilePicture from "./linked-profile-picture";
import CommentSvg from "./icons/comment";

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
      className="custom-transition-200 flex gap-3 border-b border-slate-400 p-4 transition-colors hover:bg-gray-900"
    >
      <div className="flex min-w-max flex-col">
      <LinkedProfilePicture
        username={author.username}
        imageUrl={author.profilePicture}
        pixelCount={56}
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

        <div className="flex pt-2">
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
