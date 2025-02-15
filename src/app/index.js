import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// Dynamically set the favicon
const link = document.createElement("link");
link.rel = "icon";
link.href = "/favicon.ico";
document.head.appendChild(link);

ReactDOM.render(<App />, document.getElementById("root"));
