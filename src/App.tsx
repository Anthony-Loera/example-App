import React, { ReactElement } from 'react'
import './/style.sass'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './about'
import Homepage from './Homepage'
import PostView from './Post'

function App(): ReactElement {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<PostView />} />
        <Route path="/user/:id" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
