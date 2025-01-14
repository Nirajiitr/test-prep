import React, { useEffect } from 'react'
import Footer from '../components/defaultPage/Footer'
import TestList from '../components/homePage/TestList'
import { tests } from '../data'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTests } from '../store/test-slice'

const TestUpcoming = () => {
  const dispatch = useDispatch();
  const {tests, isLoading} = useSelector((state) => state.test);
  useEffect(()=>{
    dispatch(fetchTests("upcoming"))
  },[dispatch])
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col">
      <main className="flex-grow">
        <TestList tests={tests} isUpcoming isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  )
}

export default TestUpcoming