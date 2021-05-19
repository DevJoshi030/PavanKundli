import React from "react";
import { render } from "react-dom";
import Main from "./components/Main";

interface AppProps {}

const App: React.FC<AppProps> = ({}) => {
  return (
    <div className="container">
      <Main />
    </div>
  );
};

const appDiv = document.getElementById("app");
render(<App />, appDiv);

export default App;
