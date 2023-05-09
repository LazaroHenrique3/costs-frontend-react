import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

//Components
import Container from "./component/layout/Container";
import Home from "./component/pages/Home";
import NewProject from "./component/pages/NewProject";
import NewCategory from "./component/pages/NewCategory";
import Navbar from './component/layout/Navbar'
import Footer from './component/layout/Footer'
import Projects from "./component/pages/Projects";
import Project from "./component/pages/Project";

//Toasts
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Container customClass="min_height">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/newproject" element={<NewProject />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/newcategory" element={<NewCategory />} />
          </Routes>
        </Container>
        <Footer />
      </Router>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
    </>
  );
}

export default App;
