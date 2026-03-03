import { redirect } from "@sveltejs/kit";

export async function load(event) {
  const session = await event.locals.auth();

  // allow login page without session
  if (!session && event.url.pathname !== "/login") {
    throw redirect(303, "/login");
  }

  return { session };
}