import {
  createBrowserRouter
} from "react-router-dom";

import Home from "./pages/Home";

import CreateValentine from "./pages/CreateValentine";
import ValentineView from "./pages/ValentineView";
import RoseDay from "./component/ui/RoseDay";
import ValentineDays from "./pages/ValentineDays";
import Special from "./pages/Special";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/ValentineWeek",
    element: <ValentineDays />,
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
