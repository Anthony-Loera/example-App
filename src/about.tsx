import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function About() {
  const params = useParams<{ id: string }>();
  const [post, setPost] = useState<Post>();
  const [postList, setPostList] = useState<Post[]>();
  const [author, setAuthor] = useState<User>();
  const navigate = useNavigate();

  const handleClick = (id: number) => () => {
    navigate(`/post/${id}`);
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
      .then((response) => {
        return response.json();
      })
      .then((p) => {
        setPost(p);
      });
  }, [params.id]);

  useEffect(() => {
    if (!post) return;
    console.log(post.userId);
    fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        setAuthor(user);
      });
  }, [post]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        const listPosts = posts.filter(
          (postList: Post) => postList.userId === author?.id
        );
        setPostList(listPosts);
      });
  }, [author]);
  console.log(postList);

  return (
    <div className="container">
      <header className="App-header">
        <div>My App</div>
      </header>
      <div className="Author">
        <h2>{author?.name}</h2>
        <h3>{author?.username}</h3>
        <h3>{author?.email}</h3>
      </div>
      <div className="authorPosts">
        {postList?.map((list: Post) => {
          return (
            <div>
              <button onClick={handleClick(list.id)} className="btn">
                <h3 className="authorPosts">{list.title}</h3>
              </button>
              <p> {list.body}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default About;
