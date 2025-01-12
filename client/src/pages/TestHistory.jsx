import React, { useEffect } from 'react'
import Footer from '../components/defaultPage/Footer'
import TestHistoryCard from '../components/testHistory/TestHistoryCard'
import { testHistory } from '../data'
import { motion } from "framer-motion";
import { useDispatch, useSelector } from 'react-redux';
import { getTestHistory } from '../store/test-slice';

const TestHistory = () => {
  const dispatch = useDispatch()
  const {user} = useSelector((state)=>state.auth)
  const {testResHistory , isLoading } = useSelector((state)=>state.test)
  useEffect(()=>{
    dispatch(getTestHistory(user?._id))
  },[dispatch, user])

  
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col">
      <main className="flex-grow p-4">
       
        <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
        Test History
      </h2>
      {testResHistory?.length === 0 ? (
        <p className="text-gray-300 text-center text-lg">No test history available.</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.2 },
            },
          }}
        >
          
          {testResHistory && 
          
          testResHistory?.map((test) => (
            <TestHistoryCard key={test.id} test={test} isLoading={isLoading} />
          ))}
        </motion.div>
      )}
      </main>
      <Footer />
    </div>
  )
}

export default TestHistory