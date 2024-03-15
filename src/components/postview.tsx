import Image from "next/image";
import Link from "next/link";
import { type RouterOutputs } from "~/utils/api";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;

  return (
    <Link href={`/post/${post.id}`}>
      <div key={post.id} className="flex gap-3 border-b border-slate-400 p-4">
        <Link href={`/@${author.username}`}>
            <Image
              src={author.profilePicture}
              className="size-14 rounded-full"
              alt={`@${author.username}'s profile picture`}
              width={56}
              height={56}
            />
        </Link>

        <div className="flex flex-col">
          <div className="flex gap-1 text-slate-300">
            <Link href={`/@${author.username}`}>
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
