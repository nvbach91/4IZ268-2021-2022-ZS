import React from "react";
import MainView from "./components/MainView";
import { AuthProvider } from "./hook/AuthContext";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <MainView />
      </AuthProvider>
    </div>
  );
}

export default App;
