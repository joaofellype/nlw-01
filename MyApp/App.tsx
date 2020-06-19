/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';

import Routes from './src/routes'

import { StatusBar } from "react-native";


const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
     <Routes />
     </>
  );
};

export default App;
