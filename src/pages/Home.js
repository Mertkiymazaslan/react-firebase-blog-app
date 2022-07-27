import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Grid } from "@material-ui/core";
import PostCard from "../components/PostCard";
import {Container} from "@material-ui/core";
import Masonry from "react-masonry-css";

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
          columnClassName="my-masonry-grid_column">
          {posts.map((post) => (
            <div key={post.id}>
              <PostCard post={post}/>
            </div>
          ))}
        </Masonry>
      )}
    </Container>
  );
};

export default Home;
