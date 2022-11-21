import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function PostForm() {
  const [title, setTitle] = useState<string>("");

  const ctx = trpc.useContext();

  const { mutate, isLoading, isError } = trpc.post.createPost.useMutation({
    async onSuccess() {
      await ctx.post.invalidate();
    },
    onError({ data }) {
      console.log(data);
    },
  });

  function createPost(title: string) {
    mutate({ title });
  }

  return (
    <div>
      <h2 className="m-4">Create a post:</h2>
      <form
        className="m-4"
        onSubmit={(e) => {
          e.preventDefault();
          createPost(title);
          setTitle("");
        }}
      >
        <input
          value={title}
          disabled={isLoading}
          onChange={(e) => setTitle(e.target.value)}
          className="text-black"
          type="text"
          placeholder="Title"
        />
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>
      {isError ? <p>Error sumitting post</p> : null}
    </div>
  );
}
