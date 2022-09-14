import React from "react";
import ".//App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Grid from "@mui/material/Grid";

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

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function PostView() {
  const params = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [activePost, setActivePost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/`);
  };

  useEffect(() => {
    console.log(params.id);
    if (params.id !== undefined) {
      fetch("https://jsonplaceholder.typicode.com/posts/" + params.id)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setActivePost(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [params.id]);

  useEffect(() => {
    if (activePost) {
      fetch("https://jsonplaceholder.typicode.com/users/" + activePost?.userId)
        .then((response) => {
          return response.json();
        })
        .then((user) => {
          setUser(user);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch("https://jsonplaceholder.typicode.com/comments")
        .then((response) => response.json())
        .then((comments) => {
          const activeComments = comments.filter(
            (comment: Comment) => comment.postId === Number(activePost?.id)
          );
          setComments(activeComments);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [activePost]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = (post: Post) => () => {
    setActivePost(post);

    fetch("https://jsonplaceholder.typicode.com/users/" + post.userId)
      .then((response) => {
        return response.json();
      })
      .then((users) => {
        setUser(users);
      })
      .catch((error) => {
        console.log(error);
      });

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((comments) => {
        const filteredComments = comments.filter(
          (comment: Comment) => comment.postId === Number(post.id)
        );
        setComments(filteredComments);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <AppBar style={{ padding: 25 }}>
        <Typography onClick={handleSubmit}>My App</Typography>
      </AppBar>
      <Grid style={{ paddingTop: 55 }} container>
        <Grid item sm={12} md={12} lg={4}>
          <List sx={{ maxwidth: 200 }}>
            {posts.map((post) => {
              return (
                <ListItemButton key={post.id} onClick={handleClick(post)}>
                  {post.title}
                </ListItemButton>
              );
            })}
          </List>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <Card style={{ textAlign: "center", maxHeight: 800 }}>
            <img alt="'random" src="https://picsum.photos/500/600" />
            <h3>{activePost?.title}</h3>
            <h5>{activePost?.body}</h5>
            {/* deepcode ignore DOMXSS: <it works> */}
            <a href={`/user/${activePost?.id}`}>{user?.name}</a>
          </Card>
        </Grid>
        <Grid item sm={12} md={6} lg={4}>
          <div style={{ paddingTop: 15 }}>
            {comments.map((info) => {
              return (
                <List key={info.id}>
                  <Avatar alt="'random" src="https://picsum.photos/50/50" />
                  <h3>{info.name}</h3>
                  <p>{info.body}</p>
                </List>
              );
            })}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
