import { Post } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function SinglePost({ post }: { post: Post }) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState<string>("");

  const ctx = trpc.useContext();

  const {
    mutate: deletePost,
    isError: isDeleteError,
    isLoading: isDeleteLoading,
  } = trpc.post.deletePost.useMutation({
    onSuccess() {
      ctx.post.getAll.invalidate();
    },
  });

  const {
    mutate: editPost,
    isError: isEditError,
    isLoading: isEditLoading,
  } = trpc.post.editPost.useMutation({
    onSuccess() {
      ctx.post.getAll.invalidate();
    },
  });

  const { id, title } = post;

  return (
    <>
      <div className="flex w-64 justify-between">
        <p>{title}</p>
        <div>
          <button
            className="mr-2"
            onClick={() => {
              setIsEditing(true);
              setEditTitle(title);
            }}
            disabled={isEditing || isEditLoading}
          >
            e
          </button>
          <button onClick={() => deletePost({ id })} disabled={isDeleteLoading}>
            x
          </button>
        </div>
        {isDeleteError ? <p>Error deleting post</p> : null}
      </div>
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            editPost({ id, title: editTitle });
            setEditTitle("");
            setIsEditing(false);
          }}
        >
          <input
            value={editTitle}
            disabled={isDeleteLoading || isEditLoading}
            onChange={(e) => setEditTitle(e.target.value)}
            className="mr-2 text-black"
            type="text"
            placeholder="Title"
          />
          <button type="submit" disabled={isEditLoading}>
            Submit
          </button>
        </form>
      ) : null}
      {isEditError ? <p>Error updating post</p> : null}
    </>
  );
}
