import React from "react";
import Image from "next/image";
import Link from "next/link";

const LinkedProfilePicture = (props: {
  username: string;
  imageUrl: string;
  pixelCount?: number;
  size?: number;
}) => {
  const usedSize = `size-${props.size}` ?? "size-14";
  return (
    <Link href={`/@${props.username}`}>
        <Image
          src={props.imageUrl}
          alt={`@${props.username}'s profile picture`}
          className={`${usedSize} rounded-full transition-opacity duration-200 hover:opacity-75`}
          width={props.pixelCount ?? 56}
          height={props.pixelCount ?? 56}
        />
    </Link>
  );
};

export default LinkedProfilePicture;
