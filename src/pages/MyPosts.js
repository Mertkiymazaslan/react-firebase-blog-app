import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { auth } from "../firebase";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const usersCollectionReference = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      //getting all the documents in the spesific collection(posts)
      const data = await getDocs(usersCollectionReference);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs);
      setLoading(false);
    };

    getPosts();
  }, []);

  const htmlToDraftBox = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    );
    return EditorState.createWithContent(contentState);
  };

  const deletePost = async(id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setPosts(posts.filter(post => post.id !== id));
  }

  return (
    <>
      {loading ? (
        <h1>loading..</h1>
      ) : (
        posts
          .filter((post) => post.owner === auth.currentUser.displayName)
          .map((post) => (
            <div>
              <IconButton onClick={() => deletePost(post.id)}>
                <DeleteIcon />
              </IconButton>
              <Editor
                key={post.id}
                editorState={htmlToDraftBox(post.text)}
                wrapperClassName="homeWrapper"
                editorClassName="homeEditor"
                toolbarClassName="none"
              />
            </div>
          ))
      )}
    </>
  );
};

export default MyPosts;
