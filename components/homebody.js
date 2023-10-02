"use client"
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiExpandVertical, BiFolderPlus } from "react-icons/bi";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { db } from "../firebase";
import firebase from "firebase";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import DocumentRow from "./documentRow";

const HomeBody = () => {
    const { data: session, status } = useSession()

    const [open, setOpen] = React.useState(false);
    const [input, setInput] = React.useState(""); 
    const handleOpen = () => setOpen(!open);

    var [snapshot, setSnap] = React.useState([]);

    React.useEffect(() => {
        const unsubscribe = db.collection('userDocs').doc(session?.user?.email).collection('doc').orderBy('timestamp', 'desc').onSnapshot((snap)=> {
            var tempAr = []
            snap.forEach((item) => {
                tempAr.push({id:item.id, fileName:item.data().fileName, timestamp:item.data().timestamp})
            })
            setSnap(tempAr)
        })
      return () => {
          unsubscribe()
        }
    }, [db])


    const createDocument = () => {
        if(!input) return;
        db.collection('userDocs').doc(session?.user?.email).collection('doc').add({
            fileName: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        handleOpen()
        setInput("")
    }

    const getGreeting = () => {
        var today = new Date()
        var curHr = today.getHours()
        if (curHr < 12) {
            return ('Good Morning')
        } else if (curHr < 18) {
            return ('Good Afternoon')
        } else {
            return ('Good Evening')
        }
    }
    return (
        <>
            <section className="bg-[#F8F9FA] pb-10 px-6 md:px-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between py-6">
                        <h2 className="hidden md:inline-flex text-gray-700 text-sm md:text-base">
                            Start a new document
                        </h2>
                        <h2 className="inline-flex md:hidden text-gray-700 text-sm md:text-base cursor-text">
                            {getGreeting()}, {session?.user?.name}!
                        </h2>
                        <div className="hidden md:inline-flex" style={{alignItems:"center"}}>
                            <h2 className="text-gray-700 text-sm md:text-base hidden md:inline-flex cursor-pointer">
                                {getGreeting()}, {session?.user?.name}!
                            </h2>
                            {/* <BiExpandVertical color="gray" className="border-0 text-xl ml-2 text-gray-300" /> */}
                        </div>
                    </div>
                    <div>
                        <div onClick={handleOpen} className="relative h-40 w-32 md:h-52 md:w-40 border-2 cursor-pointer hover:border-blue-100">
                            <Image src='https://links.papareact.com/pju' layout="fill" />
                        </div>
                        <p className="ml-2 mt-2 text-xs md:text-md text-gray-700 font-medium">Blank</p>
                    </div>
                </div>
            </section>

            <section className="bg-white px-5 md:px-0">
                <div className="max-w-4xl mx-auto pt-8">
                    <div className="flex items-center justify-between pb-5">
                        <h2 className="font-medium flex-grow text-sm md:text-base text-gray-700">My Documents</h2>
                        <p className="text-xs md:text-sm text-gray-700 cursor-pointer">Date Created</p>
                        <BiFolderPlus color="gray" className="border-0 text-xl ml-5 text-gray-300 cursor-pointer" />
                    </div>
                </div>
            </section>

            <section className="bg-white px-5 md:px-0">
                <div className="max-w-4xl mx-auto ">
                    {snapshot.map(doc =>(
                        <DocumentRow 
                            key={doc.id}
                            id={doc.id}
                            fileName={doc.fileName}
                            date={doc.timestamp}
                        />
                    ))}
                </div>
            </section>


            <Dialog open={open} size="xs" handler={handleOpen}>
                <DialogBody divider>
                    <input 
                        placeholder="Enter name of document..."
                        className="outline-none w-full font-medium text-sm"
                        type="text"
                        value={input}
                        onChange={(e)=>setInput(e.target.value)}
                        onKeyDown={(e)=> e.key === "Enter" && createDocument()}
                    />
                </DialogBody>
                <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={handleOpen}
                    className="mr-1"
                >
                    <span>Cancel</span>
                </Button>
                <Button variant="gradient" color="blue" onClick={createDocument}>
                    <span>Create</span>
                </Button>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default HomeBody;