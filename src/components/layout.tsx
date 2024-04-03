import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import AnimatedIcon from "./icons/animated-icon";
import BirdIconSvg from "./icons/bird-icon-svg";

export const PageLayout = (props: PropsWithChildren<object>) => {
  return (
    <main className="flex justify-center">
      <header className="sticky flex h-screen flex-col items-center justify-between px-4 pb-5 pt-2 md:w-16">
        <div>
          <Link href="/">
            <AnimatedIcon IconComponent={BirdIconSvg} height={40} width={40} />
          </Link>
        </div>

        <div>
          <SignedIn>
            <div className="scale-150">
              <UserButton />
            </div>
          </SignedIn>
          <SignedOut>
            <SignInButton />
          </SignedOut>
        </div>
      </header>

      <div className="size-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>

      <div className="hidden md:block md:w-16"></div>
    </main>
  );
};
