import { Route, Routes } from "react-router";
import Main from "./pages/home";
import SignInForm from "./pages/auth/SignIn";
import RegisterForm from "./pages/auth/Register";
import Privet from "./pages/auth/Privet";
import Content from "./pages/home/Content";
import AddNewWork from "./pages/addWork/AddNewWork";
import AllCustomers from "./pages/customers";
import { Toaster } from "./components/ui/toaster";
import Error from "./pages/error/Error";


function App() {
  return (
    <>
     <Routes>
      {/* Parent Route with Static Header and Sidebar */}
      <Route path="/" element={<Main />}>
      
        {/* Auth routes */}
        <Route path="signin" element={<SignInForm />} />
        <Route path="register" element={<RegisterForm />} />
<Route path="p" element={<Privet></Privet>}></Route>
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
