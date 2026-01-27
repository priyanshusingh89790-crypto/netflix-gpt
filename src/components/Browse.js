
import Nowplayingmovie from "./Hooks/useNowplayingmovie";

import MainContainer from "./maincontainer";
import SecondaryContainer from "./secondarycontainer";
const Browse = () => {
   Nowplayingmovie();
    return (
        <div className="flex flex-col ">
            <MainContainer/>
            <SecondaryContainer/>
        </div>
    );
};      
export default Browse;
