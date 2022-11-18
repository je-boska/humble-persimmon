import { trpc } from "../utils/trpc";

export default function PostList() {
  const { data: posts } = trpc.post.getAll.useQuery();

  return (
    <div className="m-4">
      {posts?.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
