import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from "react"
import { UserContext } from "./contexts/UserContext";
import Header from './components/Header'
import Home from './components/Home';
import Story from './components/Story';
import AllTopics from './components/AllTopics';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer'
import AllStories from './components/AllStories';

function App() {
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    setLoggedInUser({ username: 'cooljmessy' });
  }, [setLoggedInUser]);

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stories" element={<AllStories />} />
        <Route path="/stories/:article_id" element={<Story />} />
        <Route path="/topics" element={<AllTopics/>} />
        <Route path="/topics/:slug" element={<AllStories />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
