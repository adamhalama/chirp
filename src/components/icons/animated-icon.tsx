import { SvgIconProps } from "./comment-icon-svg";

interface AnimatedIconProps {
  IconComponent: React.FC<SvgIconProps>;
  width: number;
  height: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  IconComponent,
  width,
  height,
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
  </div>
);

export default AnimatedIcon;
