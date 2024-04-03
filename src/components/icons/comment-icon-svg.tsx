import * as React from "react";

export type SvgIconProps = {
  height: string | number;
  width: string | number;
  className?: string;
};

const CommentIconSvg: React.FC<SvgIconProps> = ({ height, width, className }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="-1 -1 34 34"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M116 281c-1.2 0-2.3-.2-3.4-.4l-4.7 2.8.1-4.6c-3.6-2.2-6-5.8-6-9.8 0-6.7 6.3-12 14-12s14 5.3 14 12c0 6.6-6.3 12-14 12h0zm0-26c-8.8 0-16 6.2-16 14 0 4.4 2.3 8.3 6 10.9v7.1l7-4.3c1 .2 2 .3 3 .3 8.8 0 16-6.3 16-14 0-7.8-7.2-14-16-14h0z"
        transform="translate(-100 -255)"
        fill="#72767A"
        stroke="#72767A"
        strokeWidth={1}
        fillRule="evenodd"
      />
    </svg>
  );
};

export default CommentIconSvg;

