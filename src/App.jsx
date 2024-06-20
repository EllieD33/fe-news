import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from "react"
import { UserContext } from "./contexts/UserContext";
import Header from './components/Header'
import Home from './pages/Home';
import Story from './pages/Story';
import AllTopics from './pages/AllTopics';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer'
import AllStories from './pages/AllStories';
import PostStory from './pages/PostStory';

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
        <Route path="/stories/post-story" element={<PostStory />} />
        <Route path="/topics" element={<AllTopics/>} />
        <Route path="/topics/:slug" element={<AllStories />} />
        <Route path="*" element={<PageNotFound/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
