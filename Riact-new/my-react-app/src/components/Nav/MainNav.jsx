import { BrowserRouter } from "react-router-dom";
import { Nav } from "./Nav";
import { Routing } from "./Routing";
import store from "../redux/store";
import { Home } from "../Home/Home";
import { Provider } from "react-redux"


export const MainNav = () => {
    return (
        <>
      <Provider store={store}>
       <BrowserRouter>
         <Home></Home>
         <Routing></Routing>
       </BrowserRouter>
     </Provider>
        </>
    );
}