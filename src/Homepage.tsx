import React from "react";
import ".//App.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Avatar from "./styled/Avatar";
import Card from "./styled/Card";
import Button from "./styled/Button";
import Body from "./styled/Body";
import SideMenu from "./styled/SideMenu";
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

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export default function Homepage() {
  const params = useParams<{ id: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User>();
  const [activePost, setActivePost] = useState<Post>();
  const [comments, setComments] = useState<Comment[]>([]);
  const navigate = useNavigate();

  const handleSubmit = () => () => {
    navigate(`/`);
  };

  useEffect(() => {
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
        });
    }
  }, [activePost?.id, activePost?.userId, params.id, user]);

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
      });

    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((response) => response.json())
      .then((comments) => {
        const filteredComments = comments.filter(
          (comment: Comment) => comment.postId === Number(post.id)
        );
        setComments(filteredComments);
      });
  };

  return (
    <div>
      <Header>
        <div onClick={handleSubmit()}>My App</div>
      </Header>
      <Body>
        <SideMenu>
          {posts.map((post) => {
            return <Button onClick={handleClick(post)}>{post.title}</Button>;
          })}
        </SideMenu>
        <Card>
          <Avatar alt="'random" src="https://picsum.photos/400/500" />
          <h3>{activePost?.title}</h3>
          <h5>{activePost?.body}</h5>
          <a href={`/user/${activePost?.id}`}>{user?.name}</a>
        </Card>
        <div>
          {comments.map((info) => {
            return (
              <div>
                <Avatar alt="'random" src="https://picsum.photos/50/50" />
                <h3>{info.name}</h3>
                <p>{info.body}</p>
              </div>
            );
          })}
        </div>
      </Body>
    </div>
  );
}
