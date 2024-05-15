import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";
import {prisma} from "@/prisma/client";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export async function POST(req: NextRequest) {
  const body = await req.json()

  const bcrypt = require('bcrypt');
  // Validate request's body
  const validation = schema.safeParse(body)
  if (!validation.success) return NextResponse.json(validation.error.errors, {
    status: 400,
  })

  // Check if user already exist
  const user = await prisma.user.findUnique({
    where: { email: body.email }
  })
  if (user) return NextResponse.json({ error: 'User already exists' }, { status: 400 })

  // Create user with encrypted password
  const hashedPassword = await bcrypt.hash(body.password, 10)
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      email: body.email,
      hashedPassword: hashedPassword
    }
  })

  return NextResponse.json({ email: newUser.email })
}