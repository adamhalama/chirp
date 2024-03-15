import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import LinkedProfilePicture from "./linked-profile-picture";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <div
        key={post.id}
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
            <span className="font-thin">
              {` · ${dayjs(post.createdAt).fromNow()}`}
            </span>
          </div>
          <span className="text-lg">{post.content}</span>
        </div>
      </div>
    </Link>
  );
};
