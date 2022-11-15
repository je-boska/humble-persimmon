import { Session } from "next-auth";
import Image from "next/image";

export default function UserProfile({
  session: { user },
}: {
  session: Session;
}) {
  return (
    <div className="m-4">
      <div className="relative mb-4 h-8 w-8 overflow-hidden rounded-full">
        {user?.image ? <Image src={user?.image} alt="" layout="fill" /> : null}
      </div>
      <h2>Welcome to the app, {user?.name}!</h2>
    </div>
  );
}
