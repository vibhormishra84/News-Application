import './App.css';
import React, {useState} from 'react'
import Navbar from './Components/Navbar';
import News from './Components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App=()=>{
  const apiKey=process.env.REACT_APP_NEWS_API
  const pageSize=8;
  const state={
      progress:0
  }
  const [progress,setProgress] = useState(0)
    return (
      <div className='box'>
        <Router>
        <Navbar/>
        <LoadingBar
        color='#f11946'
        progress={progress}
      />
        <Routes>
          <Route exact path='/science' element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={pageSize} country="in" category="science"/>}/>
          <Route exact path='/general'element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general"/>}/>
          <Route exact path='/health' element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={pageSize} country="in" category="health"/>}/>
          <Route exact path='/sports' element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={pageSize} country="in" category="sports"/>}/>
          <Route exact path='/entertainment'element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>}/>
          <Route exact path='/technology' element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={pageSize} country="in" category="technology"/>}/>
          <Route exact path='/business' element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business"/>}/>
          </Routes>
        </Router>
      </div>
    )
  }

export default App;