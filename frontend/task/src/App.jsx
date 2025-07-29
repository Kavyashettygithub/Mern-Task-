import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Logindata from './Logindata'
import Register from './Register'
import Dashborad from './Dashborad'
import Addagent from './Addagent'
import Uploadcsv from './Uploadcsv'
import ViewTasks from './ViewTasks'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Logindata/>}/>
        <Route path='/register' element={<Register/>}></Route>

        <Route path='/dashboard' element={<Dashborad/>}>
        <Route path='addAgent' element={<Addagent/>}></Route>
        <Route path='uploadcsv' element={<Uploadcsv/>}></Route>
        <Route path='view' element={<ViewTasks/>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
