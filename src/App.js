import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login/Login";
import Browse from "./components/Browse";
import { Provider } from "react-redux";
import store from "./utils/appstore";
import AiMovie from "./components/Aimovie";

const AppLayout = () => {
  return (
    <>
      <Provider store={store}>
        <Header />
        <Outlet />
      </Provider>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true, 
        element: <Login />,
      },
      {
        path: "browse",
        element: <Browse />,
      },
      {
        path: "/aimovie",
        element: <AiMovie />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
