import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";
import {Jobs} from "@/services/jobs";

interface Job {
  id: string;
  userId: string;
  node: string;
  name: string;
  activeNum: string;
  codes: string;
  billings: string | null;
  createdAt: Date;
  updatedAt: Date;
  assistant: string | null;
  user: object
}

export async function GET(
  req: NextRequest,
  { params }: { params : { userId: string } }
) {
  const { userId } = params;

  // GET USER
  const user = await prisma.user.findUnique({
    where: { id: userId },
  })

  // GET JOBS
  try {
    const jobs = await prisma.job.findMany({
      where: { userId: userId }
    })

    jobs.forEach( job => {
      // @ts-ignore
      job.user = user
    })

    return NextResponse.json(jobs, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: error.code });
  }
}