import { Route,  Routes } from "react-router";
import Main from "./pages/home";
import AddNewWork from "./pages/addWork/AddNewWork";
import Error from "./Error";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/add-work" element={<AddNewWork />} />
        <Route path="/edit-work/:id" element={<AddNewWork />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    
  );
}

export default App;
