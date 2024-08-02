import { useSession } from "next-auth/react";
import LoadSegment from "../src/components/LoadSegment";
import Info from "../src/components/Info";

export default function Home() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <LoadSegment />;
  } else if (status === "unauthenticated") {
    return <Info auth={false} />;
  } else {
    const sliceEmail = session?.user.email.substring(
      0,
      session.user.email.length - 10
    );
    return <Info auth={true} sliceEmail={sliceEmail} />;
  }
}
