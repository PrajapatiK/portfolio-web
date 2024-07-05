import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import About from "./about";
import Contact from "./contact";
import Experiences from "./experiences";
import Footer from "./footer";
import Intro from "./intro";
import Projects from "./projects";
import SideBar from "./sideBar";
import CenterContent from "../../components/centerContent";
import { setLoading, setPortfolioData } from "../../redux/rootSlice";

const Home = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, portfolioData } = useSelector(state => state.root);
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        console.log('getPortfolioData called');
        dispatch(setLoading(true));
        const portfolioData = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/v1/portfolio/getAllPortfolio?username=${user?.username || process.env.REACT_APP_USERNAME}`);
        console.log(portfolioData.data.data)
        dispatch(setPortfolioData(portfolioData.data.data));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        console.log(err);
        if (err.code === 'ERR_NETWORK') setError(err.message);
      }
    }
    console.log(portfolioData);
    getPortfolioData();
  }, [])

  console.log(error);
  return (
    <div>
      <Header headerText='My Portfolio' />
      {portfolioData ? <div className="bg-primary px-40 sm:px-5">
        <Intro />
        <About />
        <Experiences />
        <Projects />
        <Contact />
        <Footer />
        <SideBar />
      </div> : (
        <>
          <CenterContent>{error ? error : "No Record Found"}</CenterContent>
          <CenterContent>
            <button className="mt-48 text-lg font-bold bg-primary text-white p-2 rounded" onClick={() => navigate('/admin')}>
              Add Portfolio Data
            </button>
          </CenterContent>
        </>
      )}
    </div>
  )
}

export default Home;