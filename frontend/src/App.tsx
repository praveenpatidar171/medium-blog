import { createBrowserRouter, RouterProvider } from "react-router-dom"
import SignIn from "./auth/SignIn"
import SignUp from "./auth/SignUp"
import Blog from "./pages/Blog"
import Blogs from "./pages/Blogs"
import Publish from "./pages/Publish"

function App() {


  const router = createBrowserRouter([
    {
      path: '/signup',
      element: <SignUp />
    },
    {
      path: '/signin',
      element: <SignIn />
    },
    {
      path: '/blog/:id',
      element: <Blog />
    },
    {
      path: '/',
      element: <Blogs />
    },
    {
      path: '/publish',
      element: <Publish />
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
