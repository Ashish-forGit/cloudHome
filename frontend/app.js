import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import appStore from "./src/store/appStore";
import AppRouter from "./appRouter";

const App = () => {
  

  return (
    <>
     <Provider store={appStore}>
            <AppRouter/>
      </Provider>
      <ToastContainer autoClose={2000} />
    </>
  );
};
const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App/>);
