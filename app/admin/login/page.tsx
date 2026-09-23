import { redirect } from "next/navigation";
import { loginAction } from "@/app/actions/admin";
import { isAdmin } from "@/lib/auth";

export const metadata = { title: "Admin" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdmin()) redirect("/admin");
  const { error } = await searchParams;

  return (
    <main id="main" className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-4 py-16">
      <h1 className="font-display text-4xl">Update the site</h1>
      <p className="mt-3 text-muted">
        For the pub owner. Visitors will not see this page in the menu.
      </p>
      <form action={loginAction} className="mt-8 space-y-4">
        <label className="block text-sm font-medium">
          Password
          <input
            type="password"
            name="password"
            required
            autoComplete="current-password"
            className="mt-2 min-h-12 w-full rounded-xl border border-ink/15 bg-cream px-4"
          />
        </label>
        {error ? (
          <p className="text-sm text-brick" role="alert">
            That password didn’t match.
          </p>
        ) : null}
        <button
          type="submit"
          className="min-h-12 w-full rounded-full bg-brick font-semibold text-cream hover:bg-brick-dark"
        >
          Log in
        </button>
      </form>
    </main>
  );
}
