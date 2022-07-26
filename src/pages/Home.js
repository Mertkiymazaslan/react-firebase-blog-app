import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const usersCollectionReference = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      //getting all the documents in the spesific collection(posts)
      const data = await getDocs(usersCollectionReference);
      setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(data.docs)
      setLoading(false);
    };

    getPosts();
  }, []);

  const htmlToDraftBox = (html) => {
    const blocksFromHtml = htmlToDraft(html);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    return EditorState.createWithContent(contentState);
  }

  return (
    <>
      {loading ? (
        <h1>loading..</h1>
      ) : (
        posts.map((post) => (
          <Editor
            key={post.id}
            editorState={htmlToDraftBox(post.text)}
            wrapperClassName="homeWrapper"
            editorClassName="homeEditor"
            toolbarClassName="none"
          />
        ))
      )}
    </>
  );
};

export default Home;
