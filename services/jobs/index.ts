import {Job} from "@prisma/client";

export class Jobs {
  static async submit(job: any) {
    const newJob = await fetch('api/jobs', {
      method: 'POST',
      body: JSON.stringify(job)
    })

    return await newJob.json()
  }

  static async list(params: { userId?: string }) {
    const jobs = await fetch(`api/jobs/${params.userId}`);
    return await jobs.json()
  }
}