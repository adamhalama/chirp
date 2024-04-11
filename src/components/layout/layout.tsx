import {
  SignedOut
} from "@clerk/nextjs";
import { type PropsWithChildren } from "react";
import Header from "./header";
import BottomSignUpBanner from "./sign-up-bar";

export const PageLayout = (props: PropsWithChildren<object>) => {
  return (
    <div className="flex h-screen flex-col justify-between">
      <main className="flex justify-center">
        <Header />

        <div className="size-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
          {props.children}
        </div>

        <div className="hidden md:block md:w-16"></div>
      </main>

      <SignedOut>
        <BottomSignUpBanner />
      </SignedOut>
    </div>
  );
};
