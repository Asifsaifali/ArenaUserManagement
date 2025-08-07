import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import Hero from "./pages/Hero/Hero";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SignIn, SignUp } from "@/pages/auth";
import Contact from "./pages/Hero/Contact";


function App() {
  return (
    <>
     <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      {/* <Route path="/auth/*" element={<Auth />} /> */}
      <Route path="/auth/sign-in" element = {<SignIn/>} />
      {/* <Route path="*" element={<Navigate to="/dashboard/home" replace />} /> */}
      <Route path="/contact" element =  {<Contact/>}  />
      <Route path="/" element={<Hero />} />
    </Routes>
    </>
  );
}

export default App;
