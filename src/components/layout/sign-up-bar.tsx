import { SignInButton, SignUpButton } from "@clerk/clerk-react";

const BottomSignUpBanner = () => {
  return (
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
  );
};

export default BottomSignUpBanner;
