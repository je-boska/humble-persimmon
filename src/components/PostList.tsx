import { trpc } from "../utils/trpc";
import SinglePost from "./SinglePost";

export default function PostList() {
  const { data: posts } = trpc.post.getAll.useQuery();

  return (
    <div className="m-4">
      {posts?.map((post) => (
        <SinglePost key={post.id} post={post} />
      ))}
    </div>
  );
}
