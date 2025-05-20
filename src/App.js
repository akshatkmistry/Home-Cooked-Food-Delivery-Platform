import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import{BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import { CartProvider } from './components/ContextReducer.js';
import Cart from './screens/Cart';
import MyOrder from './screens/MyOrder';
function App() {
  return (
  
    <CartProvider>
    <Router>
  <div>
    <Routes>
      <Route extact path="/" element={<Home/>} />
      <Route extact path="/login" element={<Login/>} />
      <Route extact path="/createuser" element={<Signup/>} />
      <Route extact path="/cart" element={<Cart/>} />
      <Route extact path="/myorder" element={<MyOrder/>} />

    </Routes>
  </div>
    </Router>
    </CartProvider>
  ); 
}

export default App;
