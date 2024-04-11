import Link from "next/link";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import AnimatedIcon from "../icons/animated-icon";
import BirdIconSvg from "../icons/bird-icon-svg";

const Header = () => {
  return (
    <header className="sticky flex h-screen flex-col items-center justify-between px-4 pb-5 pt-2 md:w-16">
      <div>
        <Link href="/">
          <AnimatedIcon
            IconComponent={BirdIconSvg}
            height={40}
            width={40}
          />
        </Link>
      </div>

      <div>
        <SignedIn>
          <div className="scale-150">
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;