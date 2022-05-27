import './App.css';
import Home from './containers/Home/Home';
import { Route, Routes, BrowserRouter, useLocation } from 'react-router-dom';
import SignInForm from './containers/SignForms/SignInForm';
import SignUpForm from './containers/SignForms/SignUpForm';
import Navbar from './containers/Navbar/Navbar';
import About from './containers/About/About';
import ArticleURLForm from './containers/ArticleURLForm/ArticleURLForm';
import ArticleSummary from './containers/ArticleSummary/ArticleSummary';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  const location = useLocation();

  return (
    <>
    {location.pathname !== '/enterURL' && location.pathname !== '/articleSummary' ? <Navbar /> : ""}
    <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/sign-in" element={<SignInForm />} />
        <Route exact path='/sign-up' element={<SignUpForm />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/enterURL' element={<ArticleURLForm />} />
        <Route exact path='/articleSummary' element={<ArticleSummary />} />
    </Routes>
    </>
  );
}

export default App;
