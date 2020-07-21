import React from "react";
import "./App.css";
import Titles from "./components/Titles";
import Form from "./components/Form";
import Weather from "./components/Weather";

function App() {
  return (
    <div className="App">
      <Titles />
      <Form />
      <Weather />
    </div>
  );
}

export default App;
