import Header from './components/layout/Header';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom';

import Home from './components/pages/Home';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Products from './components/product/Products';
import ProductDetails from './components/product/ProductDetails';
import ProductByCategory from './components/product/ProductByCategory';
import ErrorPage from './components/layout/ErrorPage';
import SearchProducts from './components/product/SearchProducts';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path='*' element={
                        <ErrorPage 
                            errorCode='404'
                            errorText='Sorry the requested page was not found'
                            linkText='Keep shopping here' 
                        />
                    }
                />
                <Route exact path='/' element={<Home />} />
                <Route exact path='/products' element={<Products />} />
                <Route exact path='/about' element={<About />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/product/:id' element={<ProductDetails />} />
                <Route exact path='/products/:category' element={<ProductByCategory />} />
                <Route exact path='/search/:keyword' element={<SearchProducts />} />

            </Routes>
        </Router>
    );
}

export default App;
