import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./index.css";
import Layout from "./components/Layout";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login.tsx";
import UserProfile from "./pages/UserProfile";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import DeletePost from "./pages/DeletePost";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Authors from "./pages/Authors";
import UserProvider from "./context/userContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <Layout />
      </UserProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/posts/:id", element: <PostDetail /> },
      { path: "/profile/:id", element: <UserProfile /> },
      { path: "/authors", element: <Authors /> },
      { path: "/create", element: <CreatePost /> },
      { path: "/posts/categories/:category", element: <CategoryPosts /> },
      { path: "/posts/user/:id", element: <AuthorPosts /> },
      { path: "/myposts/:id", element: <Dashboard /> },
      { path: "/posts/:id/edit", element: <EditPost /> },
      { path: "/posts/:id/delete", element: <DeletePost /> },
      { path: "/logout", element: <Logout /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
