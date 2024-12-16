import { Route, Routes } from "react-router";
import Main from "./pages/home";
import AddNewWork from "./pages/addWork/AddNewWork";
import Error from "./Error";
import AllCustomers from "./pages/customers";
import Content from "./pages/home/Content";
import SignInForm from "./pages/auth/Signin";
import RegisterForm from "./pages/auth/Register";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <>
     <Routes>
      {/* Parent Route with Static Header and Sidebar */}
      <Route path="/" element={<Main />}>
      
        {/* Auth routes */}
        <Route path="signin" element={<SignInForm />} />
        <Route path="register" element={<RegisterForm />} />

        {/* Default Content */}
        <Route index element={<Content />} />

        {/* Child Routes for Dynamic Content */}
        <Route path="add-work" element={<AddNewWork />} />
        <Route path="edit-work/:id" element={<AddNewWork />} />
        <Route path="allCustomers" element={<AllCustomers />} />

        {/* Catch-All Route */}
        <Route path="*" element={<Error />} />
        
      </Route>
    </Routes>
    <Toaster />
    </>
   
  );
}

export default App;
