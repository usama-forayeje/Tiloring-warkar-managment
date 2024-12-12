import { Route,  Routes } from "react-router";
import Main from "./pages/home";
import AddNewWork from "./pages/addWork/AddNewWork";
import Error from "./Error";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-client" element={<AddNewWork />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    
  );
}

export default App;
