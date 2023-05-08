import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layouts = () => {
  return (
    <main>
        <Header />
        <Outlet />
    </main>
    )
}

export default Layouts