import React from "react";
import "./App.css";
import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import About from "./about";

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
function Homepage() {
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
  }, [activePost?.id, activePost?.userId, params.id]);

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
    <div className="container">
      <header className="App-header">
        <div onClick={handleSubmit()}>My App</div>
      </header>
      <div className="body">
        <div className="sideMenu">
          {posts.map((post) => {
            return (
              <button onClick={handleClick(post)} className="btn">
                {post.title}
              </button>
            );
          })}
        </div>
        <div className="card">
          <img alt="'random" src="https://picsum.photos/400/500" />
          <h3>{activePost?.title}</h3>
          <h5>{activePost?.body}</h5>
          <a href={`/user/${activePost?.id}`}>{user?.name}</a>
        </div>
        <div>
          {comments.map((info) => {
            return (
              <div>
                <img
                  className="avatar"
                  alt="'random"
                  src="https://picsum.photos/50/50"
                />
                <h3>{info.name}</h3>
                <p>{info.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<Homepage />} />
        <Route path="/user/:id" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
