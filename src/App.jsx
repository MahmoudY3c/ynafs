import React from 'react';
import {
  HashRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from './routes/NotFound/NotFound.jsx';
import ErrMessage from './components/ErrMessage.jsx';
import MainForm from './routes/MainForm/MainForm.jsx';
import PowerPointPage from './routes/PowerPointPage/PowerPointPage.jsx';
import DisplayPage from './routes/Display/DisplayPage.jsx';
import "./css/style.css";
// import './css/antd/antd.min.css'

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: '/',
    element: <MainForm />,
    errorElement: <ErrMessage />
  },
  {
    path: '/powerpoint',
    element: <PowerPointPage />,
    errorElement: <ErrMessage path="/powerpoint" />
  },
  {
    path: '/display',
    element: <DisplayPage />,
    errorElement: <ErrMessage path="/display" />
  },
]

function App() {
  return (
    <Router>
      <Routes>
        {routes.map((route, i) => (
          <Route key={i} element={route.element} path={route.path} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
