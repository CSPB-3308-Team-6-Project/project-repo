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
                    const { email, password } = credentials as Record<string, string>;

                    if (!email || !password) return null;

                    // Prisma equivalent of MongoUser.findOne({ email })
                    const user = await prisma.user.findUnique({ where: { email } });

                    if (!user) return null;

                    const hashedPassword = user.password;
                    if (!hashedPassword) return null;

                    const validPassword = await verifyPassword({ password: password, hashedPassword: hashedPassword });

                    if (!validPassword) return null;

                    return { id: user.id.toString(), email: user.email, name: user.name };
                } catch (error) {
                    console.error("Error during authorization:", error);
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