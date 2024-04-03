import dayjs from "dayjs";
import Link from "next/link";
import router from "next/router";
import { RouterOutputs } from "~/utils/api";
import LinkedProfilePicture from "./linked-profile-picture";
import { PostView } from "./postview";
import AnimatedIcon from "./icons/animated-icon";
import CommentIconSvg from "./icons/comment-icon-svg";

type PostWithUser = RouterOutputs["posts"]["getByIdWithParents"][number];

type PostProps = {
  postWithUser: PostWithUser;
};

const ThreadParentPost = ({ postWithUser }: PostProps) => {
  const { post, author } = postWithUser;

  const handleClick = () => router.push(`/post/${post.id}`);

  return (
    <div
      key={post.id}
      onClick={handleClick}
      className="my-2 flex flex-row gap-3 border-slate-400 px-4"
    >
      <div className="flex min-w-max flex-col">
        <div className="flex gap-3">
          <LinkedProfilePicture
            username={author.username}
            imageUrl={author.profilePicture}
            size={12}
          />
        </div>
        <span className="my-2 ml-6">|</span>
      </div>

      <div className="flex flex-col text-sm">
        <div className="flex gap-1 text-slate-300">
          <Link href={`/@${author.username}`} className="hover:underline">
            <span>{`@${author.username}`}</span>
          </Link>
          <span>{` ·`}</span>
          <span className="font-thin">{dayjs(post.createdAt).fromNow()}</span>
        </div>

        <span>{post.content}</span>

        <div className="group flex pt-2">
          <AnimatedIcon IconComponent={CommentIconSvg} width={18} height={18} />
          <span className="custom-transition-200 select-none pl-1 text-sm text-slate-300 group-hover:text-blue-500">
            {post.children.length}
          </span>
        </div>
      </div>
    </div>
  );
};

type ThreadPostViewProps = {
  thread: PostWithUser[];
};

const ThreadPostView = ({ thread }: ThreadPostViewProps) => {
  return (
    <div>
      {thread.map((item, index) => {
        const isMainPost = index === thread.length - 1;
        return isMainPost ? (
          <PostView key={item.post.id} postWithUser={item} />
        ) : (
          <ThreadParentPost key={item.post.id} postWithUser={item} />
        );
      })}
    </div>
  );
};

export default ThreadPostView;
