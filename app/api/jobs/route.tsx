import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/prisma/client";


export async function GET (req: NextRequest) {
  const jobs = await prisma.job.findMany()
  return NextResponse.json(jobs)
}

export async function POST (req: NextRequest) {
  const body = await req.json();

  //VALIDATE DATA
  // TODO => Confirm requirements for jobs
  // TODO => Implement code for post request

}