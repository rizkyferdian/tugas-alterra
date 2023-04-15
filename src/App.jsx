import React, { useEffect } from "react";
import CreateProduct from "./pages/createproduct";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import LandingPage from "./pages/landingpage";
import Login from "./pages/login";

function App() {
  useEffect(() => {
    alert("Welcome");
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index path="/" element={<CreateProduct />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />

      </>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div >

  )
}

export default App
