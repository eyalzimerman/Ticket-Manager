import "./App.css";
import React from "react";
import SearchArea from "./components/SearchArea";
import email from "../src/photos/email-icon.png";
import facebook from "../src/photos/facebook-icon.png";
import github from "../src/photos/github-icon.png";
import linkedin from "../src/photos/linkedin-icon.png";

function App() {
  return (
    <div className="App">
      <SearchArea />
      <footer className="footer">
        <div className="footer-content-right">
          <a href="https://github.com/eyalzimerman" target="_blank">
            <img src={github} className="icon-style" alt="Github icon" />
          </a>
          <a href="https://www.facebook.com/eyal.zimerman" target="_blank">
            <img src={facebook} className="icon-style" alt="Facebook icon" />
          </a>
          <a href="mailto: zimerman1998@gmail.com" target="_blank">
            <img src={email} className="icon-style" alt="Email icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/eyal-zimerman-657946208/"
            target="_blank"
          >
            <img src={linkedin} className="icon-style" alt="Linkedin icon" />
          </a>
          <p className="name">Eyal-Zimerman</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
