import React, {useState} from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { convertToHTML, convertFromHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html'; //html formatını editördeki hale cevirmek icin de html-to-draft kullan.
import htmlToDraft from "html-to-draftjs";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { Alert } from "react-bootstrap";
import TextField from '@material-ui/core/TextField';
import { Button } from "@material-ui/core";


const CreatePost = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const [editorState2, setEditorState2] = useState(() => EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const usersCollectionReference = collection(db, "posts");

  const publishPostHandler = async() => {
    const data = { title, owner: auth.currentUser.displayName, text: draftToHtml(convertToRaw(editorState.getCurrentContent())) };
    if (data.text === "<p></p>\n" || data.title === ""){
      setError("Title and post cannot be empty.")
    }
    else{
      await addDoc(usersCollectionReference, data);
      navigate("/");
    }
  };

  return (
    <div className="createPost">
      <h2>Create a New Post</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <TextField fullWidth color="secondary" autoFocus label="Title.." variant="filled" onChange={(e) => setTitle(e.target.value)} />
      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        wrapperClassName="createPageWrapperClass"
        editorClassName="createPageEditorClass"
        toolbarClassName="createPageToolbarClass"
      /> 
      <br/>
      <Button className="publishButton" color="secondary" variant="contained" onClick={publishPostHandler}>Publish Post</Button>

    </div>
  );
};

export default CreatePost;
