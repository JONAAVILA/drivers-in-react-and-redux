import Pagination from "../../components/pagination/Pagination";
import SearchBar from "../../components/searchBar/SearchBar";
import './Home.css';

const Home = ()=>{
    return(
        <div className="box_home" >
            <SearchBar/>
            <Pagination/>
        </div>
    )
}

export default Home;