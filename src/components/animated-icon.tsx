import Image from 'next/image';
import styles from '~/styles/styles';


interface AnimatedIconProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  count: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({ src, alt, width, height, count }) => (
  <div className="group flex">
    <div className="relative inline-block">
      <div
        className={`${styles.haloEffect} ${styles.transition}`}
        style={{
          boxShadow: "0 0 2px 8px rgba(59, 130, 246, 0.3)", // Halo effect
          background: "rgba(59, 130, 246, 0.3)", // Subtle background color for the halo
          mixBlendMode: "screen",
        }}
      ></div>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${styles.transition} relative z-10 group-hover:mix-blend-overlay`}
      />
    </div>
    <span
      className={`${styles.transition} pl-1 text-sm text-slate-300 group-hover:text-blue-500`}
    >
      {count}
    </span>
  </div>
);

export default AnimatedIcon;