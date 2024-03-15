import React from "react";
import Image from "next/image";
import Link from "next/link";

const LinkedProfilePicture = (props: {
  username: string;
  imageUrl: string;
  size: number;
}) => {
  return (
    <Link href={`/@${props.username}`}>
        <Image
          src={props.imageUrl}
          alt={`@${props.username}'s profile picture`}
          className="size-14 rounded-full transition-opacity duration-200 hover:opacity-75"
          width={props.size ?? 56}
          height={props.size ?? 56}
        />
    </Link>
  );
};

export default LinkedProfilePicture;
