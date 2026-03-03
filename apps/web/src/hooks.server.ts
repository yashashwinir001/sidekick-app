import { SvelteKitAuth } from "@auth/sveltekit";
import GitHub from "@auth/core/providers/github";
import Credentials from "@auth/core/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { AUTH_SECRET, GITHUB_ID, GITHUB_SECRET } from "$env/static/private";

const prisma = new PrismaClient();

const auth = SvelteKitAuth({
  secret: AUTH_SECRET,
  trustHost: true,
  providers: [
    GitHub({ clientId: GITHUB_ID, clientSecret: GITHUB_SECRET }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
});

// ✅ Export handle as a plain function — this is what SvelteKit expects
export const handle = auth.handle;

// ✅ Export signIn/signOut for use in server files
export const signIn = auth.signIn;
export const signOut = auth.signOut;