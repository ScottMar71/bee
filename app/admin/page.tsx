import { redirect } from "next/navigation";
import { AdminForm } from "@/components/AdminForm";
import { isAdmin } from "@/lib/auth";
import { getSite } from "@/lib/site";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/admin/login");
  const site = await getSite();

  return (
    <main id="main" className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
      <AdminForm initial={site} />
    </main>
  );
}
