import { Routes, Route } from 'react-router-dom';
import './App.css'
import Header from './components/Header'
import Home from './components/Home';
import Story from './components/Story';

function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stories" element={<Home />} />
        <Route path="/stories/:article_id" element={<Story />} />
      </Routes>
    </>
  )
}

export default App
