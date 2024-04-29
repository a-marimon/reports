'use client'
import React, {FormEvent, FormEventHandler, useState} from "react";
import {signIn} from "next-auth/react"

const SignInPage = () => {
  const [ userInfo, setUserInfo ] = useState({
    username: '',
    password: ''
  })

  const handleSubmit = async ( event: FormEvent<HTMLFormElement> ) => {
    event.preventDefault()

    const response = await signIn('credentials', {
      username: userInfo.username,
      password: userInfo.password,
      redirect: false
    })

    console.log(response)
  }

  return (
    <form onSubmit={ ( event) => handleSubmit(event) }>
      <input type="text"
             placeholder="Username"
             onChange={(e) => setUserInfo({
        username: e.target.value,
        password: userInfo.password
      })}/>

      <input type="password"
             placeholder="Password"
             onChange={(e) => setUserInfo({
        username: userInfo.username,
        password: e.target.value
      })} />

      <input type="submit" />
    </form>
  )
}

export default SignInPage