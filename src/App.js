// import logo from './images/logo.svg';
// import "./css/style.css";
// import ChooseLesson from './components/ChooseLesson.js'
// import Nav from './components/Nav.js'
// import TextArea from './components/TextArea.js'
// import Raect, { useState } from 'react';
// import {
//   BrowserRouter as Router,
//   Switch,
//   Route,
//   Link
// } from "react-router-dom";

// function App() {
//   let [selected, setSelected] = useState()
//   return (
//     <div className="App">
//       <header>
//         <Nav />
//       </header>
//       <form action="/" method="post">
//         <ChooseLesson />
//         <div className="sections-container">
//           <TextArea name="meanings" placeholder="مفردات الدرس...." title="مفردات الدرس" />
//           <TextArea name="preparing" placeholder="اكتب تهيئة الدرس..." title="تهيئة الدرس" />
//         </div>
//         <div className="sections-container">
//           <TextArea name="prof_Insreuctions" placeholder="قم بكتابة تعليمات المعلم...." title="تعليمات المعلم" />
//           <TextArea name="lesson_closing" placeholder="قم بكتابة إغلاق الدرس..." title="إغلاق الدرس" />
//         </div>
//         <section className="section-body">
//           <button type="submit" className="submit-btn btn">حفظ</button>
//         </section>
//       </form>
//     </div>
//   );
// }

// export default App;

import Raect from 'react';
import PageForm from "./routes/insertData.js";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <PageForm />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
