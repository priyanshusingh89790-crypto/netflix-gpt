import Header from "./Header";
import { useState } from "react";
import {useRef} from "react";
import checkdata from "../utils/validData";

const Login = () => {
    const [issigninform, setissigninform] = useState(true);
    const [error, seterror]=useState("");
    const email=useRef(null);
    const password=useRef(null);
    const handleButtononclick=()=>{
        const message =checkdata(email.current?.value ,password.current?.value);
        seterror(message);
    }
    const togglesigninform=()=>{
        setissigninform(!issigninform);

    }
    return (
        <div>
            <form onSubmit={(e)=>e.preventDefault()} className="flex flex-col absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black text-white bg-opacity-80"> <h1 className="text-3xl font-bold pt-8 ml-10">{!issigninform ? "Sign In" : "Sign Up"}</h1>
            {issigninform && <input className="w-96 h-12 mt-20 ml-10 rounded-lg border border-gray-600 bg-gray-700" type="name" placeholder=" Name" />}
            <input ref={email} className="w-96 h-12 mt-20 ml-10 rounded-lg border border-gray-600 bg-gray-700" type="email" placeholder=" Email" />
            <input ref={password} className="w-96 h-12 mt-20 ml-10 rounded-lg border border-gray-600 bg-gray-700" type="password" placeholder=" Password" />
            <p className="text-red-600 font-bold ml-10 mt-2">{error}</p>
            <button className="bg-red-600 w-96 h-12 mt-20 ml-10 rounded-lg border border-gray-600 my-4 mr-8" type="submit"onClick={handleButtononclick}>{!issigninform ? "Sign In" : "Sign Up"}</button>
            <p className="flex ml-10 mb-20 mt-2 hover:cursor-pointer"> {!issigninform ? "New to Netflix?" : "Already have an account?"} <a onClick={()=>togglesigninform()}>{!issigninform ? "Sign Up" : "Sign In"}</a></p>
            </form>
             <div>
            <img className="w-full h-screen object-cover" src="https://assets.nflxext.com/ffe/siteui/vlv3/e8136cfe-c5b7-464f-8c26-d68d676e0916/web/IN-en-20251229-TRIFECTA-perspective_c50c689c-0d42-413b-bd09-f4fc62fbec13_large.jpg" alt="background image" />
        </div>
        </div>
         
    );

};
export default Login;