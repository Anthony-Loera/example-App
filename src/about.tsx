import React from "react";
import ".//App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./styled/Button";
import Author from "./styled/Author";
import AuthorPosts from "./styled/AuthorPosts";
import Header from "./styled/Header";

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

export default function About() {
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

  return (
    <div>
      <Header>
        <div>My App</div>
      </Header>
      <Author>
        <h2>{author?.name}</h2>
        <h3>{author?.username}</h3>
        <h3>{author?.email}</h3>
      </Author>
      <AuthorPosts>
        {postList?.map((list: Post) => {
          return (
            <div>
              <Button onClick={handleClick(list.id)}>
                <h3>{list.title}</h3>
              </Button>
              <p> {list.body}</p>
            </div>
          );
        })}
      </AuthorPosts>
    </div>
  );
}
