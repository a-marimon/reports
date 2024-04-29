import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from "next/server";
import schema from "@/app/api/users/schema";
import {param} from "ts-interface-checker";

export async function GET (req: NextRequest) {
  // GET LIST OF USER
  const users = await prisma.user.findMany()
  return NextResponse.json(users)
}

export async function POST (req: NextRequest) {
  const body = await req.json();
  const bcrypt = require("bcrypt");

  // VALIDATE DATA
  const validation = schema.safeParse(body)

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // CHECK IF EMAIL IS TAKEN
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  })
  if (user) {
    return NextResponse.json({ error: "Account with email already exists" }, { status: 400 } )
  }

  // CREATE USER
  try {
    const hash = await bcrypt.hash(body.password, 0)
    const newUser = await prisma.user.create({
      data: {
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        password: hash,
      }
    })

    return NextResponse.json(newUser, { status: 201 });
  } catch ( error: any ) {
    return NextResponse.json({ error: error.toString() });
  }
}
