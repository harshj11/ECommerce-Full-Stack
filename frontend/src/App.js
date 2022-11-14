import Header from './components/layout/Header';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import Home from './components/layout/Home';
import About from './components/layout/About';
import Contact from './components/layout/Contact';
import Products from './components/product/Products';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        
        <Route exact path='/home' element={<Home />}/>
        <Route exact path='/products' element={<Products />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />

      </Routes>
    </Router>
  );
}

export default App;
