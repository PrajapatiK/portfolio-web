import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { apiGet } from "../../services/api";
import { getQueryStringFromURL } from "../../lib/util";
// import { ADMIN_ROLE } from "../../lib/common/constants";

const Home = () => {
  const [error, setError] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, portfolioData } = useSelector(state => state.root);
  const { isAuthenticated, user } = useSelector((state) => state.auth);


  useEffect(() => {
    const getPortfolioData = async () => {
      try {
        dispatch(setLoading(true));
        const params = getQueryStringFromURL();
        console.log(params);
        const username = user?.username || params.username || process.env.REACT_APP_USERNAME;
        // const Username = user?.role === ADMIN_ROLE ?  user?.username;
        setSearchParams({ username });
        const portfolioData = await apiGet(`/getAllPortfolio?username=${username}`);
        dispatch(setPortfolioData(portfolioData.data));
        dispatch(setLoading(false));
      } catch (err) {
        dispatch(setLoading(false));
        setError(err?.data?.message);
      }
    }
    getPortfolioData();
  }, [])

  return (
    <div>
      {/* <Header headerText='My Portfolio' /> */}
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