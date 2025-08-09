import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Dashboard2 = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-600">Dashboard</h2>
        <nav className="flex flex-col gap-4">
          <Link to="addAgent" className="hover:text-blue-600">➕ Add Agent </Link>
          <Link to="uploadcsv" className="hover:text-green-600">📤 Upload CSV</Link>
          <Link to="view" className="hover:text-purple-600">📄 View Tasks</Link>
            <Link to="agent" className='hover:text-blue-300'>View Agent</Link>
          <Link to="logout" className='hover:text-blue-300'>🚪Log Out</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h1 className='text-4xl font-extrabold text-black-600'>Welcome to dashboard </h1>
        <Outlet />
      </main>
    </div>
  )
}

export default Dashboard2
