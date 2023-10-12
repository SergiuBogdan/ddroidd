import "./App.css";
import Footer from "./components/Pages/Footer";
import Header from "./components/Pages/Header";
import Form from "./components/Pages/Form";
import Home from "./components/Pages/Home";
import ThanksPage from "./components/Pages/ThankYouPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="form" element={<Form />} />
          <Route path="thankyou" element={<ThanksPage />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
