import { Post } from "@prisma/client";
import { trpc } from "../utils/trpc";

export default function SinglePost({ post }: { post: Post }) {
  const ctx = trpc.useContext();

  const { mutate, isLoading, isError } = trpc.post.deletePost.useMutation({
    onSuccess() {
      ctx.post.getAll.invalidate();
    },
  });

  const { title } = post;

  function deletePost(id: string) {
    mutate({ id });
  }

  return (
    <div className="flex w-52 justify-between">
      <p>{title}</p>
      <button onClick={() => deletePost(post.id)} disabled={isLoading}>
        x
      </button>
      {isError ? <p>Error deleting post</p> : null}
    </div>
  );
}
