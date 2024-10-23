// import { useState } from 'react'

import { useEffect, useState } from "react";
import "./App.css";
import TaskListPerUserComponent from "./TaskAddEdit/TaskListPerUserComponent";
import Login from "./login/Login";
import { AuthController } from "./controllers/AuthController";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    setLoggedIn(checkIfLoggedIn());
  }, []);

  const checkIfLoggedIn = () => {
    const user_id = Number(localStorage.getItem("bonanza_user_id"));
    const token = localStorage.getItem("bonanza_token");
    if (user_id == null || user_id <= 0 || token == null || token.length <= 0)
      return false;
    return true;
  };

  const handleLogout = async () => {
    await AuthController.Logout();
    window.location.reload();
  };

  return (
    <>
      {!loggedIn && <Login></Login>}
      {loggedIn && (
        <div className="w-full h-full">
          <button
                onClick={handleLogout}
                className="btn btn-warning "
              >
                Logout
              </button>
          <TaskListPerUserComponent />
        </div>
      )}
    </>
  );
}

export default App;
