import React from 'react'
import { BrowserRouter,Route} from 'react-router-dom'

import Home from './pages/home/home'
import CreatePoint from './pages/createPoint/createPoint'
const Routes = () =>{

    return(
    <BrowserRouter>
        <Route component={Home} path="/" exact />
        <Route component={CreatePoint} path="/createPoint" />

    </BrowserRouter>
    )
}

export default Routes;