import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import Logindata from './Logindata'
import Register from './Register'
import Dashborad from './Dashborad'
import Addagent from './Addagent'
import Uploadcsv from './Uploadcsv'
import ViewTasks from './ViewTasks'
import AgentDashboard from './AgentDashboard'
import Logout from './Logout'
import AgentLogin from './AgentLogin'
import Dashboard2 from './Dashboard2'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Logindata/>}/>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/agentlogin' element={<AgentLogin/>}></Route>


        <Route path='/dashboard' element={<Dashborad/>}>
        <Route path='addAgent' element={<Addagent/>}></Route>
        <Route path='uploadcsv' element={<Uploadcsv/>}></Route>
        <Route path='view' element={<ViewTasks/>}></Route>
        <Route path='agent' element={<AgentDashboard/>}></Route>
        <Route path='logout' element={<Logout/>}></Route>
        </Route>

        <Route path='/dash' element={<Dashboard2/>}>
        <Route path='addAgent' element={<Addagent/>}></Route>
        <Route path='uploadcsv' element={<Uploadcsv/>}></Route>
        <Route path='view' element={<ViewTasks/>}></Route>
        <Route path='agent' element={<AgentDashboard/>}></Route>
        <Route path='logout' element={<Logout/>}></Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
