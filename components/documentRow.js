import React, { useState } from 'react'
import { BsFillFileEarmarkTextFill } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { useRouter } from 'next/navigation'
import { db } from "../firebase";
import { useSession } from "next-auth/react";

const DocumentRow = ({id, fileName, date}) => {

    const { data: session, status } = useSession()
    const router = useRouter()
    const delDoc = () => {
        var confirm = window.confirm(`Are you sure you want to delete ${fileName}?`)
        if(confirm) {
            db.collection('userDocs').doc(session?.user?.email).collection('doc').doc(id).delete().then(() =>{
                alert('Document deleted successfully.')
            })
        }
    }

  return (
    <div className='flex'>
        <div className="flex flex-grow bg-gray-100 hover:bg-gray-300 p-2 py-3 pr-2 rounded-xl mb-2 cursor-pointer" onClick={() => router.push(`/doc/${id}`)}>
            <div className="flex flex-grow">
                <BsFillFileEarmarkTextFill color="#2196f3" className="text-xl md:text-2xl" />
                <p className="ml-3 text-xs md:text-base text-gray-700 cursor-pointer self-center">{fileName}</p>
            </div>
            <p className="text-xs md:text-sm text-gray-700 cursor-pointer self-center">{date?.toDate().toLocaleDateString()}</p>
        </div>
            <MdDelete color="rgb(239 83 80)" onClick={delDoc} style={{marginTop:'-10px'}} className="self-center border-0 text-xl ml-3 text-gray-300 cursor-pointer" />
    </div>
  )
}

export default DocumentRow
