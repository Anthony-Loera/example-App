import React from "react";
import ".//App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Author from "./styled/Author";
import AuthorPosts from "./styled/AuthorPosts";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

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
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [author]);

  return (
    <div>
      <AppBar style={{ padding: 25 }}>
        <Typography>My App</Typography>
      </AppBar>
      <div style={{ paddingTop: 60 }}>
        <Author>
          <h2>{author?.name}</h2>
          <h3>{author?.username}</h3>
          <h3>{author?.email}</h3>
        </Author>
        <AuthorPosts>
          {postList?.map((list: Post) => {
            return (
              <List key={list.id}>
                <ListItemButton onClick={handleClick(list.id)}>
                  <h3>{list.title}</h3>
                </ListItemButton>
                <p> {list.body}</p>
              </List>
            );
          })}
        </AuthorPosts>
      </div>
    </div>
  );
}
