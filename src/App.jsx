import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import {HashRouter, Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'

function App() {
  const [count, setCount] = useState(0)

  const isLoading = useSelector(state=>state.isLoading);
  return (
      <HashRouter>
        <NavBar />
        {
          isLoading && <LoadingScreen />
        }
        
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/products' element={<Products />}/>
          <Route path='/products/:id' element={<ProductDetails/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/purchases' element={<Purchases/>}/>

        </Routes>
      </HashRouter>
  )
}

export default App
