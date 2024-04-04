import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { type PropsWithChildren } from "react";
import AnimatedIcon from "./icons/animated-icon";
import BirdIconSvg from "./icons/bird-icon-svg";

export const PageLayout = (props: PropsWithChildren<object>) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex justify-center">
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

        <div className="size-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
          {props.children}
        </div>

        <div className="hidden md:block md:w-16"></div>
      </main>

      <SignedOut>
        <div className="sticky bottom-0 flex justify-end bg-blue-500 p-4 pr-20">
          <SignInButton>
            <button className="mr-2 rounded-3xl border border-white px-4 py-2 text-white">
              Sign In
            </button>
          </SignInButton>

          <SignUpButton mode="modal">
            <button className="rounded-3xl bg-white px-4 py-2 text-black">
              Sign Up
            </button>
          </SignUpButton>
        </div>
      </SignedOut>
    </div>
  );
};
