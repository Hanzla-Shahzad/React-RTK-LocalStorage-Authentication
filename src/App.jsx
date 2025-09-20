import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import CheckOut from "./components/checkOut";
import Auth from "./components/auth";
import Main from "./components/main";
import ProtectedRouutes from "./components/protectedRouutes";

function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/Main",
      element: (
        <ProtectedRouutes>
          <Main />
        </ProtectedRouutes>
      ),
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRouutes>
          <CheckOut />
        </ProtectedRouutes>
      ),
    },
  ]);
  return (
    <>
      <RouterProvider router={routes}></RouterProvider>
    </>
  );
}

export default App;
