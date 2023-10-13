import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BookPage from "./pages/book";
import ContactPage from "./pages/contact";
import UserTable from "./components/Admin/User/UserTable";
import LoginPage from "./pages/login";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import RegisterPage from "./pages/register";
import ViewOder from "./pages/oder";
import { callFetchAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccountAction } from "./redux/account/accountSlice";
import Loading from "./components/Loading";
import NotFound from "./components/NotFound";
import AdminPage from "./pages/admin";
import ManageAccount from "./components/Account/ManageAccount";
import ProtectedRoute from "./components/ProtectedRoute";
import LayoutAdmin from "./components/Admin/LayoutAdmin";
import BookTable from "./components/Admin/Book/BookTable";
import ManageOrder from "./components/Admin/Oder";
import History from "./pages/history";
import "./styles/reset.scss";
import "./styles/global.scss";

const Layout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className="layout-app">
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Outlet context={[searchTerm, setSearchTerm]} />
      <Footer />
    </div>
  );
};

export default function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.account.isLoading);

  const getAccount = async () => {
    if (
      window.location.pathname === "/login" ||
      window.location.pathname === "/register"
    )
      return;

    const res = await callFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "contact",
          element: <ContactPage />,
        },
        {
          path: "book/:slug",
          element: <BookPage />,
        },
        {
          path: "/view-order",
          element: (
            <ProtectedRoute>
              <ViewOder />
            </ProtectedRoute>
          ),
        },
        {
          path: "/history-order",
          element: (
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reset-password",
          element: <ManageAccount />,
        },
      ],
    },

    // admin
    {
      path: "/admin",
      element: <LayoutAdmin />,
      errorElement: <NotFound />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <AdminPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "user",
          element: <UserTable />,
        },
        {
          path: "book",
          element: <BookTable />,
        },
        {
          path: "order",
          element: <ManageOrder />,
        },
      ],
    },

    {
      path: "/login",
      element: <LoginPage />,
    },

    {
      path: "/register",
      element: <RegisterPage />,
    },
  ]);

  return (
    <>
      {isLoading === false ||
      window.location.pathname === "/login" ||
      window.location.pathname === "/register" ||
      window.location.pathname === "/" ? (
        <RouterProvider router={router} />
      ) : (
        <Loading />
      )}
    </>
  );
}
