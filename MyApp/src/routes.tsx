import React from 'react'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home  from './pages/Home/home'
import Points  from './pages/Points/points'
import Details  from './pages/Details/details'

const AppStack = createStackNavigator();

const Routes = () =>{

    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode="none">
                <AppStack.Screen  name="Home" component={Home}/>
                <AppStack.Screen  name="Points" component={Points}/>
                <AppStack.Screen  name="Details" component={Details}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default Routes