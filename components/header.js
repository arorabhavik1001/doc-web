"use client";
import { Button } from "@material-tailwind/react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineAppstoreAdd } from "react-icons/ai";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoAppsSharp } from "react-icons/io5";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { signOut } from "next-auth/react"
import { getSession, useSession }  from "next-auth/react"

const Header = () => {
    
  const { data: session, status } = useSession()

  const signOutClick = () => {
    var confirm = window.confirm("Are you sure you want to sign out?")
    if(confirm) {
        signOut();
    };
  }

  return (
    <header className='p-5 px-2 md:p-5 sticky top-0 z-50 flex items-center shadow-md bg-white'>
        <HiOutlineMenuAlt1  fontSize="20px" color="gray" className="mx-2 font-bold" />
        <div className="flex md:hidden absolute" style={{top:"50%", left:"47%", transform:'translate(-50%, -50%)'}}>
            <BsFillFileEarmarkTextFill style={{marginLeft:15}} color="#2196f3" className="text-3xl md:text-4xl" />
            <h1 className="ml-2 text-gray-700 text-xl text-center "><span className="font-semibold">Doc</span>Web</h1>
        </div>
        <div className="hidden md:inline-flex" style={{alignItems: 'center'}}>
            <BsFillFileEarmarkTextFill style={{marginLeft:15}} color="#2196f3" className="text-3xl md:text-4xl" />
            <h1 className="ml-2 text-gray-700 text-xl text-center "><span className="font-semibold">Doc</span>Web</h1>
        </div>

        <div className="hidden md:inline-flex flex-grow items-center px-5 py-2 bg-gray-100 rounded-lg text-gray-700 mx-5 md:mx-20 focus-within:text-gray-600 focus-within:shadow-md">
            <AiOutlineSearch color="gray" className="mx-2 text-3xl" />
            <input placeholder="Search" className="bg-transparent outline-none flex flex-grow text-base px-5 " /> 
        </div>

        <IoAppsSharp color="gray" className="hidden md:inline-flex ml-20 border-0 text-2xl" />

        <img 
            loading="lazy" 
            className="cursor-pointer h-8 w-8 md:h-10 md:w-10 rounded-full ml-auto md:ml-6"
            src={session?.user?.image}
            onClick={signOutClick}
        />
    </header>
  )
}

export default Header;
