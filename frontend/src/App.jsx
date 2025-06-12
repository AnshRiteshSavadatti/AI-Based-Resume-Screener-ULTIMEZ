import { createBrowserRouter, Form, RouterProvider } from "react-router";
import AppLayout from "./UI/AppLayout";
import Error from "./UI/Error";
import HomePage from "./UI/HomePage";
import FormResume from "./resume/Form";
import GenerateScore, {
  matchedResumesLoader,
} from "./generateScore/GenerateScore";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/form",
        element: <FormResume />,
      },
      {
        path: "/generate-score",
        element: <GenerateScore />,
        loader: matchedResumesLoader,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
