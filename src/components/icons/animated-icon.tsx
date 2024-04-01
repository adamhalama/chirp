import { SvgIconProps } from "./comment-icon";

interface AnimatedIconProps {
  IconComponent: React.FC<SvgIconProps>;
  width: number;
  height: number;
  count: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  IconComponent,
  width,
  height,
  count,
}) => (
  <div className="group flex">
    <div className="relative inline-block">
      <div className="custom-transition-200 custom-halo-effect bg-custom-blue bg-blend-overlay shadow-custom"></div>
      <IconComponent
        height={height}
        width={width}
        className="custom-transition-200 bg-blend-overlay group-hover:fill-custom-blue group-hover:stroke-custom-blue"
      />
    </div>
    <span className="custom-transition-200 select-none pl-1 text-sm text-slate-300 group-hover:text-blue-500">
      {count}
    </span>
  </div>
);

export default AnimatedIcon;
