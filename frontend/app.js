import React from "react";
import ReactDOM from "react-dom/client"

const App = () =>{
    return(
        <h1>Hello</h1>
        )
}

const parent = document.getElementById('root');
const root = ReactDOM.createRoot(parent);
root.render(<App />);