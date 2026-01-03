import './App.css';
import Login from './components/Login';
import { createBrowserRouter,BrowserRouter } from 'react-router-dom';
import Browse from './components/Browse';
import { RouterProvider } from 'react-router-dom'; 
import Header from './components/Header'; 
const app =() => {
const approuter = createBrowserRouter([
    {
        path: "/",
        element: <Login/>
    },
    {
      path: "/browse",
      element: <Browse/>
    }
]);
return (
        <div>
            <Header/>
            <RouterProvider router={approuter}/>
        </div>
    );
}

export default app;
