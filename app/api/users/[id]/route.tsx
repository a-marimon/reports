import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/client";

export async function GET(
  req: NextRequest,
  { params }: { params : { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!user) {
    return NextResponse.json({ error: "User does not exist" }, { status: 401 });
  }
  return NextResponse.json(user)
}

export async function PUT (
  req: NextRequest,
  { params }: { params : { id: string } }
) {
  const body = await req.json();

  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!user) {
    return NextResponse.json(
      { error: "User not found" },
      { status: 404 }
    )
  }

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email
    }
  })

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE (
  req: NextRequest,
  { params }: { params : { id: string } }
) {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(params.id) },
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  await prisma.user.delete({
    where: { id: user.id },
  })

  return NextResponse.json({});
}