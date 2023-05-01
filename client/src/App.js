import Navbar from "./component/layout/Navbar";
import Home from "./component/layout/Home";
import Signup from "./component/layout/Signup";
import Login from "./component/layout/Login";
import Todo from "./component/layout/Todo";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "./context/AuthContext";

function App() {
  const { loggedIn } = useContext(AuthContext);


  console.log(loggedIn);

  return (

    <BrowserRouter>
    <Navbar />
    <Routes>
      
        <Route path="/" element={<Home/>} />  
        <Route path="/signup" element={ <Signup />} />
        <Route path="/login"  element={<Login />} />
        {/* <Route path="/todo" element={loggedIn=== true ? <Todo /> : <Home /> } /> */}
        <Route path="/todo" element={<Todo /> } />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
