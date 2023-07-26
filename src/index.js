import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
//import './app/css/index.css';
//import App from './app/App.js';
import PageForm from './routes/insertData/insertData';
import NotFound from './routes/404/NotFound';
import ErrMessage from './components/ErrMessage';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: '/questions/app/',
    element: <PageForm />,
    errorElement: <ErrMessage/>
  },
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
