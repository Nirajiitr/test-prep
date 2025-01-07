import React from 'react'
import Footer from '../components/defaultPage/Footer'
import TestList from '../components/homePage/TestList'
import { tests } from '../data'

const TestUpcoming = () => {
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col">
      <main className="flex-grow">
        <TestList tests={tests} isUpcoming />
      </main>
      <Footer />
    </div>
  )
}

export default TestUpcoming