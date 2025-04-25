import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

function MainLayout() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 dark:bg-neutral-800">
        <NavBar />
        <Outlet />
      </div>
    </>
  )
}

export default MainLayout