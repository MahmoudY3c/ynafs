import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import NotFound from './routes/NotFound/NotFound.jsx';
import ErrMessage from './components/ErrMessage.jsx';
import PageForm from './routes/insertData/insertData.jsx';

const routes = [
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: '/',
    element: <PageForm />,
    errorElement: <ErrMessage />
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
