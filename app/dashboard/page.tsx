'use client'
import { useSession } from "next-auth/react";
import React, {FormEvent} from "react";
import DataTable from "@/app/components/Table/DataTable";
import {Jobs} from "@/services/jobs";
import {Simulate} from "react-dom/test-utils";

const DashboardPage = () => {
  const [showModal, setShowModal] = React.useState(false);
  const { status, data: session} = useSession()

  if (status === 'loading') {
    return <>LOADING...</>
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)

    const payload: any = {}
    payload.userId = session!.user!.id

    formData.forEach(( value, key ) => {
      payload[key] = value
    })

    console.log(payload)

    try {
      const job = await Jobs.submit(payload)
      console.log(job)
    } catch (error) {
      console.log(error)
    }
  }

  const Modal = () => {
    return(
      <div className={'absolute h-screen w-screen backdrop-blur left-0 flex justify-center items-center'}>
        <div className={'bg-white shadow-lg px-6 py-6'}>
          <h1 className={'text-2xl'}>Submit Job</h1>
          <form onSubmit={onSubmit} className={'flex flex-col align-center justify-center items-center gap-3'}>
            <input
              type='text' name={'node'} placeholder='Node' className={'border px-3'}/>
            <input
              type='text' name={'name'} placeholder={'Name'} className={'border px-3'}/>
            <input
              type='text' name={'activeNum'} placeholder={'Active Number'} className={'border px-3'}/>
            <input
              type='text' name={'codes'} placeholder={'Codes'} className={'border px-3'}/>
            <input
              type='text' name={'billings'} placeholder={'# of Passive Billings'} className={'border px-3'}/>
            <input
              type='text' name={'assistant'} placeholder={'Assistant'} className={'border px-3'}/>

            <button className={'bg-primary rounded px-6'}>
              <input type='submit' value='Submit'/>
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className={'h-full px-6 w-fit'}>
      { showModal && <Modal/> }
      <div className={'flex justify-between items-center mb-3'}>
        <h1 className={'text-2xl'}>Welcome { session?.user!.name }</h1>
        <button
          className={'bg-primary px-6 py-3 rounded'}
          onClick={() => {
            setShowModal(true);
          }}
        >
          +
        </button>
      </div>
      <div className={'border'}>
        <DataTable />
      </div>
    </div>
  )
}

export default DashboardPage;