import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {PrismaClient} from "@prisma/client";
import Error from "next/error";

const prisma = new PrismaClient()
const bcrypt = require("bcrypt");

const confirmPasswordHash = ( plainPassword: string, hashPassword: string ) => {
  return new Promise( resolve => {
    bcrypt.compare(plainPassword, hashPassword, (error: any, respomse: any) => {
      resolve(respomse)
    })
  })
}

export const authOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),

    CredentialsProvider({

      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findFirst({
          where: {
            email: credentials!.email
          }
        })

        if (user) {
          const valid = await confirmPasswordHash(credentials!.password, user.password)
          if (valid) {
            return user
          }
          else {
            console.log("Hash not matched logging in");
            return null;
          }
        } else {
          return null
        }

      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST };