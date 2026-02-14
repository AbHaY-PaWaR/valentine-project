import {
  createBrowserRouter
} from "react-router-dom";

import Home from "./pages/Home";

import CreateValentine from "./pages/CreateValentine";
import ValentineView from "./pages/ValentineView";
import Special from "./pages/Special";
import ValentineWeek from "./pages/ValentineWeek";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/ValentineWeek",
    element: <ValentineWeek />,
  },
  
   {
    path: "/v/:day/:slug",
    element: <ValentineView />,
  }
  ,
  {
    path: "/create",
    element: <CreateValentine />,
  }
  ,
  {
    path: "/special",
    element: <Special />,
  }
]);

export default router;
