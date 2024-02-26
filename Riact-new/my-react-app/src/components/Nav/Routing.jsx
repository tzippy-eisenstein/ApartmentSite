

import { Route, Routes } from 'react-router-dom'
import { Home } from '../Home/Home'
import { Login } from '../Login/Login'
import { Contact } from '../Contact/Contact'
import Apartments from '../Apartments/Apartments'
import { Update } from '../personalOptions/update'
// import { Icon } from '@mui/material'

//הצהרות על ניתובים
export const Routing = () => {
    return <>

        <Routes>
          <Route path={'/'} element={<Home></Home>}></Route>
          <Route path={'Home'} element={<Home></Home>}></Route>
          <Route path={'Login'} element={<Login></Login>}></Route>
          <Route path={'Contact'} element={<Contact></Contact>}></Route>
          <Route path={'Apartments'} element={<Apartments></Apartments>}></Route>
          <Route path={'update'} element={<Update></Update>}></Route>
        </Routes>

        {/* <Routes>
            <Route path={'/'} element={<MainHome></MainHome>}></Route>
            <Route path={'Home'} element={<MainHome></MainHome>}></Route>
            <Route path={'Recipes'} element={<MainRecipe></MainRecipe>}></Route>
            <Route path={'LogIn'} element={<MainLogIn></MainLogIn>}></Route>
            <Route path={'personalArea'} element={<MyRecipe></MyRecipe>}></Route>
            <Route path={'AddRecipe'} element={<AddRecipe></AddRecipe>}></Route>
            <Route path={'MyRecipe'} element={<MyRecipe></MyRecipe>}></Route>
            <Route path={'Manager'} element={<MainManager></MainManager>}>
                <Route path={'AddRecipe'} element={<AddRecipe></AddRecipe>}></Route>
            </Route>
            <Route path={'addLevel'} element={<Level></Level>}></Route>
            <Route path={'addCategory'} element={<Category></Category>}></Route>
            <Route path={'SignIn'} element={<MainSignIn></MainSignIn>}></Route>
            <Route path={'RecipeDetails/:id'} element={<RecipeDetails></RecipeDetails>}>
                <Route path={'ShowReply/:idRecipe'} element={<ShowReply></ShowReply>}></Route>
                <Route path={'AddReply/:idUser/:idRecipe'} element={<AddReply></AddReply>}></Route>
            </Route>
        </Routes> */}
    </>
}