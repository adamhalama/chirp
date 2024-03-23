import { useUser } from "@clerk/nextjs";

import { useState } from "react";
import toast from "react-hot-toast";
import { LoadingSpinner } from "~/components/loading";
import { api } from "~/utils/api";
import LinkedProfilePicture from "./linked-profile-picture";

export const CreatePostWizard = ({defaultText, parentId}: {defaultText?: string, parentId?: string}) => {
  const { user } = useUser();

  const [input, setInput] = useState("");

  const ctxUtils = api.useUtils();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctxUtils.posts.infinitePosts.invalidate();
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
      <LinkedProfilePicture
        username={"@" + user.username}
        imageUrl={user.imageUrl}
        size={56}
      />

      <input
        placeholder={defaultText ?? "Chirp something!"}
        className="grow bg-transparent text-xl outline-none"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            event.preventDefault();
            if (input !== "") {
              mutate({ content: input, parentId });
            }
          }
        }}
        disabled={isPosting}
      />
      {input !== "" && (
        <button onClick={() => mutate({ content: input, parentId })}>Post</button>
      )}
      {isPosting && (
        <div className="flex items-center justify-center">
          <LoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};
