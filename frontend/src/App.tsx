import React from 'react';
import {CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar";
import Register from "./features/users/Register";
import Login from "./features/users/Login";
import Posts from "./features/posts/Posts";
import NewPosts from "./features/posts/NewPosts";
import OnePost from "./features/posts/OnePost";

const App = () => {
  return (
    <>
      <CssBaseline />
      <header>
          <AppToolbar />
      </header>
      <main>
        <Routes>
            <Route path='/register' element={(<Register />)} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={(<Posts />)} />
            <Route path='/post/new' element={(<NewPosts />)} />
            <Route path='/posts/:id' element={(<OnePost />)} />
        </Routes>
      </main>
    </>
  );
};

export default App;
