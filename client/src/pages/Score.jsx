import React from "react";


import Overview from "../components/scorePage/Overview";
import TestExperience from "../components/scorePage/TestExperience";
import Status from "../components/scorePage/Status";
import SectionAnalysis from "../components/scorePage/SectionAnalysis";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Score = () => {
  const navigate = useNavigate()
  const {testResults, isLoading} = useSelector(state=>state.test)
  
  return (
    <div className=" relative h-screen w-screen overflow-y-scroll no-scrollbar bg-[#0D1117] text-[#EDEDED] p-4">
      <h1 className="sm:text-3xl font-bold mb-6 sm:text-center">Test Summary</h1>
      <button onClick={()=>navigate("/user/home")} className="btn btn-primary absolute right-4 top-2 sm:top-4 ">go to home</button>
     {
      isLoading ? <div>loading...</div> :   <>
      <Overview results={testResults} />
      <TestExperience />
      <Status results={testResults} />
      <SectionAnalysis results={testResults} />
      </>
     }
    
    </div>
  );
};

export default Score;
