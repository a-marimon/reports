import {NextRequest, NextResponse} from "next/server";
import schema from "@/app/api/jobs/schema";
import {prisma} from "@/prisma/client";

export async function POST(req: NextRequest) {
  const body = await req.json();

  // VALIDATE DATA
  const validation = schema.safeParse(body)
  if(!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  try {
    const newJob = await prisma.job.create({
      data: body
    })
    return NextResponse.json(newJob, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.code });
  }
}

export async function GET (req: NextRequest) {
  const jobs = await prisma.job.findMany()
  return NextResponse.json(jobs)
}
