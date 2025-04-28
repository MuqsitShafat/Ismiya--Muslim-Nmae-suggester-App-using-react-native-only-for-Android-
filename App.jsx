import { View} from 'react-native'
import React, { useEffect, useState } from 'react'
import Splash_screen from './src/Splash_screen'
import Main_Screen from './src/Main_Screen'

const App = () => {
  const [currentscreen, setcurrentscreen] = useState('main')
  useEffect(() => {
    setInterval(() => {
      setcurrentscreen('gender')
    }, 3000);
  }, [])
  
  return (
    <View style = {{flex : 1,}}>
      {currentscreen === 'main'? <Splash_screen /> : <Main_Screen />}
    </View>
  )
}

export default App