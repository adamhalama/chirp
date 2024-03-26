import Image from "next/image";

interface AnimatedIconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  count: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  src,
  alt,
  width,
  height,
  count,
}) => (
  <div className="group flex">
    <div className="relative inline-block">
      <div className="custom-transition custom-halo-effect bg-custom-blue bg-blend-screen shadow-custom"></div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="custom-transition relative z-10 group-hover:mix-blend-overlay"
      />
    </div>
    <span className="custom-transition pl-1 text-sm text-slate-300 group-hover:text-blue-500">
      {count}
    </span>
  </div>
);

export default AnimatedIcon;
