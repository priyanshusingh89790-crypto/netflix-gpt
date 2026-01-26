
import { LOGO_URL } from "../utils/constant";
const Header = () => {
    return (<header className="absolute z-10 bg-gradient-to-b from-black via-black/50 to-transparent h-28 w-full">    
        <div className=" w-full">
            <img className=" w-80 ml-20 "
             src={LOGO_URL}  alt="logo" />
        </div>
    </header>);
};  
export default Header;