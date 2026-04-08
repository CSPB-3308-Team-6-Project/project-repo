import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "./password-helpers";
import { prisma } from "../prisma";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            authorize: async (credentials): Promise<{ id: string; email: string; name: string } | null> => {
                try {
                    console.log("[AUTH] Starting authorization attempt");
                    const { email, password } = credentials as Record<string, string>;

                    if (!email || !password) {
                        console.log("[AUTH] Missing email or password");
                        return null;
                    }

                    console.log("[AUTH] Attempting to find user:", email);
                    // Prisma equivalent of MongoUser.findOne({ email })
                    const user = await prisma.user.findUnique({ where: { email } });

                    if (!user) {
                        console.log("[AUTH] User not found:", email);
                        return null;
                    }

                    console.log("[AUTH] User found, verifying password");
                    const hashedPassword = user.password;
                    if (!hashedPassword) {
                        console.log("[AUTH] No hashed password in database");
                        return null;
                    }

                    const validPassword = await verifyPassword({ password: password, hashedPassword: hashedPassword });

                    if (!validPassword) {
                        console.log("[AUTH] Invalid password");
                        return null;
                    }

                    console.log("[AUTH] Authorization successful for:", email);
                    return { id: user.id.toString(), email: user.email, name: user.name };
                } catch (error) {
                    console.error("[AUTH] Error during authorization:", error);
                    return null;
                }
            },
        }),
    ],
    session: { strategy: "jwt" },
    secret: process.env.NEXTAUTH_SECRET,
    pages: { signIn: "/login" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };