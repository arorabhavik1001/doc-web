"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { db } from "../../../firebase";
import { useRouter } from "next/navigation";
import Login from "../../../components/Login";
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import '../../../styles.css'
import TextEditor from "../../../components/TextEditor";
import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { convertFromRaw, convertToRaw } from "draft-js";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), {
    ssr: false,
});


const page = ({ params }) => {
  var { data: session, status } = useSession();
  const router = useRouter();

  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
   
    const [fileName, setFileName] = useState("");
    const [loadedOnce, setLoaded] = useState(false)
    
    const signOutClick = () => {
        var confirm = window.confirm("Are you sure you want to sign out?")
        if(confirm) {
            signOut();
        };
    }

    if (!session) {
        return <Login />;
    } else {

        const getData = () => {
            if(!loadedOnce) {
                db
                .collection("userDocs")
                .doc(session?.user?.email)
                .collection("doc")
                .doc(params.docId)
                .get().then((snapshot) => {
                    setFileName(snapshot.data().fileName);
                    if (snapshot?.data()?.editorState) {
                        setEditorState(
                            EditorState.createWithContent(
                            convertFromRaw(snapshot?.data()?.editorState)
                            )
                        );
                    }
                })
                setLoaded(true)
            }
        }

        getData()
        

        const handleEdit = (editorState) => {
            setEditorState(editorState)
            setSaving(true)
            setSaved(false)

            db.collection("userDocs")
            .doc(session?.user?.email)
            .collection("doc")
            .doc(params.docId).set({
                editorState: convertToRaw(editorState.getCurrentContent())
            }, {merge:true}).then(()=> {
                setSaving(false)
                setSaved(true)
            })
        }

        return (
            <div>
                <header className="flex items-center justify-between p-3 pb-1 ">
                    <BsFillFileEarmarkTextFill
                        onClick={() => router.push("/ ")}
                        style={{ marginLeft: 15 }}
                        color="#2196f3"
                        className="text-3xl md:text-4xl cursor-pointer"
                    />
                    <div className="flex-grow px-1 sm:px-2 ml-1">
                        <div className="flex">
                            <h2 className="text-gray-800 text-lg">{fileName}</h2>
                            {saving&&<p className="ml-5 text-gray-500 self-center text-xs">Saving changes</p>}
                            {saved&&<p className="ml-5 text-gray-500 self-center text-xs">Changes saved</p>}
                        </div>
                        <div className="hidden sm:inline-flex items-center text-sm space-x-1 -ml-1 h-8 text-gray-600">
                            <p className="option">File</p>
                            <p className="option">Edit</p>
                            <p className="option">View</p>
                            <p className="option">Insert</p>
                            <p className="option">Format</p>
                            <p className="option">Tools</p>
                        </div>
                    </div>
                    <img 
                        loading="lazy" 
                        className="cursor-pointer h-8 w-8 md:h-10 md:w-10 rounded-full ml-auto md:ml-6"
                        src={session?.user?.image}
                        onClick={signOutClick}
                    />
                </header>

                {/* <TextEditor docId={params.docId} /> */}
                <div className='bg-[#F8F9FA] min-h-screen pb-16'>
                    <Editor 
                        editorState={editorState}
                        onEditorStateChange={handleEdit}
                        toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
                        editorClassName='mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10'
                    />
                </div>
            </div>
        );

    }
};

export default page;
