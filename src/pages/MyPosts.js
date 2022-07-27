import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import htmlToDraft from "html-to-draftjs";
import { EditorState, ContentState } from "draft-js";
import { auth } from "../firebase";
import PostCard from "../components/PostCard";
import { Container, Grid } from "@material-ui/core";
import Masonry from "react-masonry-css";

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

  const deletePost = async (id) => {
    const postDoc = doc(db, "posts", id);
    await deleteDoc(postDoc);
    setPosts(posts.filter((post) => post.id !== id));
  };

  const breakPoints = {
    default: 3,
    1350: 2,
    1000: 1
  }


  return (
    <Container>
      {loading ? (
        <h1>loading..</h1>
      ) : (
        <Masonry
          breakpointCols={breakPoints}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {posts
            .filter((post) => post.owner === auth.currentUser.displayName)
            .map((post) => (
                <PostCard post={post} deleteHandler={deletePost} />
            ))}
        </Masonry>
      )}
    </Container>
  );
};

export default MyPosts;
