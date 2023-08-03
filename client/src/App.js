import { Route, Routes } from "react-router-dom";
import Login from "./Login";

const App = () => {
  return (
    <div>
      <h1>Contact Manager</h1>
      <Routes>
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
