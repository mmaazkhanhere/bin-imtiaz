import DashboardUI from "@/components/dashboard/dashboard-ui";
import { isAdmin } from "@/helpers/user-check";
import { auth } from "@clerk/nextjs/server";

export default function Home() {
  const user = auth();
  const authorized = isAdmin(user.userId as string);

  if (!authorized) {
    return null;
  }

  return (
    <main>
      <DashboardUI />
    </main>
  );
}
