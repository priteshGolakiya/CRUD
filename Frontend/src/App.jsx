import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./components/getUser/User";
import AddUser from "./components/addUser/AddUser";
import UpdateUser from "./components/updateUser/UpdateUser";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
          <Route path="/create" element={<AddUser />}></Route>
          <Route path="/:id/edit" element={<UpdateUser />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
