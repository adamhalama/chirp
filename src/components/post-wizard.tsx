import { useUser } from "@clerk/nextjs";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";

export const CreatePostWizard = () => {
    const { user } = useUser();
  
    const [input, setInput] = useState("");
  
    const ctxUtils = api.useUtils();
  
    const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
      onSuccess: () => {
        setInput("");
        void ctxUtils.posts.getAll.invalidate();
      },
      onError: (error) => {
        const errorMessage = error.data?.zodError?.fieldErrors.content;
        if (errorMessage?.[0]) {
          toast.error(errorMessage[0]);
        } else {
          toast.error("Failed to post! Please try again later.");
        }
      },
    });
  
    if (!user) return null;
  
    return (
      <div className="flex w-full gap-3 ">
        <Link href={`/@${user.username}`}>
          <Image
            src={user.imageUrl}
            alt="Profile image"
            className="size-14 rounded-full"
            width={56}
            height={56}
          />
        </Link>
  
        <input
          placeholder="Type something!"
          className="grow bg-transparent outline-none"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              if (input !== "") {
                mutate({ content: input });
              }
            }
          }}
          disabled={isPosting}
        />
        {input !== "" && (
          <button onClick={() => mutate({ content: input })}>Post</button>
        )}
        {isPosting && (
          <div className="flex items-center justify-center">
            <LoadingSpinner size={20} />
          </div>
        )}
      </div>
    );
  };