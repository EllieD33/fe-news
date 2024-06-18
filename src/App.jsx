import { Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from "react"
import { UserContext } from "./contexts/UserContext";
import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import Story from './components/Story';
import Topic from './components/Topic'

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
        <Route path="/stories" element={<Home />} />
        <Route path="/stories/:article_id" element={<Story />} />
        <Route path="/topics/:topic_slug" element={<Topic />} />
      </Routes>
    </>
  )
}

export default App
