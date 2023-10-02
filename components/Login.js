"use client"
import Image from "next/image"
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import {signIn} from 'next-auth/react'

const Login = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <Image 
            src="https://i.ibb.co/rm0K1sL/image-2.png"
            height="300"
            width="550"
            objectFit="contain" 
        />
        <h1 className="mr-2 mt-5 text-gray-700 text-2xl text-center "><span className="font-semibold">Doc</span>Web</h1>
        <button className="w-44 mt-10 bg-blue-400 text-white shadow-lg hover:shadow-md hover:shadow-blue-200 rounded-xl py-1" style={{}}  onClick={async() => {
      await signIn();
    }}>Login</button>
    </div>
  )
}

export default Login
