import NextAuth, {NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaAdapter} from "@auth/prisma-adapter";
import {prisma} from "@/prisma/client";

export const authOptions: NextAuthOptions = {
  // @ts-ignore
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email'},
        password: { label: 'Password', type: 'password', placeholder: 'Password'},
      },
      async authorize( credentials, req){
        if (!credentials?.email || !credentials.password) return null
        const bcrypt = require('bcrypt');

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        })

        if (!user) return null

        const passwordMatched = await bcrypt.compare(credentials.password, user.hashedPassword!)

        return passwordMatched ? user : null
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
  session: {
    strategy:"jwt",
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }