import React, {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html'; //html formatını editördeki hale cevirmek icin de html-to-draft kullan.
import htmlToDraft from "html-to-draftjs";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";


const CreatePost = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const usersCollectionReference = collection(db, "posts");

  const publishPostHandler = async() => {
    const data = { title, text: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
    await addDoc(usersCollectionReference, data);
    navigate("/");
  };

  return (
    <div>
      <label>title</label>
      <input onChange={(e) => setTitle(e.target.value)}></input>
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="createPageWrapperClass"
        editorClassName="createPageEditorClass"
        toolbarClassName="createPageToolbarClass"
      /> 

      <button onClick={publishPostHandler}>Publish Post</button>

    </div>
  );
};

export default CreatePost;
