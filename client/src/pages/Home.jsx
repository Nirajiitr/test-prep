
import TestList from "../components/homePage/TestList";
import Footer from "../components/defaultPage/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTests } from "../store/test-slice";

const Home = () => {
  const dispatch = useDispatch();
  const {tests, isLoading} = useSelector((state) => state.test);
  useEffect(()=>{
    dispatch(fetchTests("available"))
  },[dispatch])
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col">
      <main className="flex-grow">
        <TestList tests={tests} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
