import { RouterProvider, createBrowserRouter } from "react-router-dom";

import TaskPage from "./pages/Task.jsx";

const router = createBrowserRouter([{ path: "/", element: <TaskPage /> }]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
