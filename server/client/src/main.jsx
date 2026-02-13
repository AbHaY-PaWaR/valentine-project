import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";
import router from "./router";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'





// createRoot(document.getElementById('root')).render(
  
   
//     <App />

    
  
// )

