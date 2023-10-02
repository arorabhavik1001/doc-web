import React, { useState } from 'react'
import dynamic from "next/dynamic"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";
import { useSession } from 'next-auth/react';
import { convertFromRaw, convertToRaw } from "draft-js";
import { db } from "../firebase";

const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), {
    ssr: false,
});
  
const TextEditor = ({docId}) => {
    var { data: session, status } = useSession();
    const [saving, setSaving] = useState(false)
    const [saved, setSaved] = useState(false)
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const handleEdit = (editorState) => {
        setEditorState(editorState)
        db.collection("userDocs")
        .doc(session?.user?.email)
        .collection("doc")
        .doc(docId).set({
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {merge:true}).then(()=>console.log('done'))
    }

  return (
    <div className='bg-[#F8F9FA] min-h-screen pb-16'>
      <Editor 
        editorState={editorState}
        onEditorStateChange={handleEdit}
        toolbarClassName='flex sticky top-0 z-50 !justify-center mx-auto'
        editorClassName='mt-6 bg-white shadow-lg max-w-5xl mx-auto mb-12 border p-10'
      />
    </div>
  )
}

export default TextEditor
