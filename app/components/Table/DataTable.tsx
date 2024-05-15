import React, {useEffect, useState} from "react";
import {Jobs} from "@/services/jobs";
import {useSession} from "next-auth/react";

interface IProps {}
interface IJob {
  node: string,
  name: string,
  user: {
    name: string,
    email: string
  },
  assistant: string,
  activeNum: string,
  codes: string,
}

const DataTable = (props: IProps) => {
  const [ jobs, setJobs ] = useState<IJob[]>()
  const { status, data: session } = useSession()

  const getJobs = async () => {
    const _jobs =  await Jobs.list({userId: session!.user!.id})
    setJobs(_jobs)
  }

  useEffect(() => {
    getJobs()
  }, [])

  return(
    <div className={'overflow-x-auto'}>
      <table>
        <thead>
          <tr className={'text-nowrap text-left'}>
            <th>Node</th>
            <th>Active #</th>
            <th>Job Codes</th>
            <th>Tech Name</th>
            <th>Tech email</th>
            <th>Date Completed</th>
            <th>Assistant</th>
          </tr>
        </thead>

        <tbody>
          {
            jobs &&
            jobs.map((job, i) => {
              return(
                <tr key={i} className={'odd:bg-gray-300'}>
                  <td>{job.node}</td>
                  <td>{job.name}</td>
                  <td>{job.activeNum}</td>
                  <td>{job.codes}</td>
                  <td>{job.user.name}</td>
                  <td>{job.user.email}</td>
                  <td>{job.assistant}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default DataTable;