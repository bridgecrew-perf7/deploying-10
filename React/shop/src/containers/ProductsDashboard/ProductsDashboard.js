import { useState } from 'react';
import { config } from './../../Constants';
import axios from 'axios';
import AddProduct from './../../components/AddProduct/AddProduct';
import ProductList from './../../components/Product/ProductList/ProductList';


function ProductsDashboard() {

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const getProducts = () => {
        setIsLoading(true);
        axios({
            method: 'GET',
            url: `${config.url.productsApi}/products`
        })
        .then((response) => {
            console.log(response.data);
            setProducts(response.data.products);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);
        });
    }

    let productList = <h1 style={{"color": "#e0e0e0"}}>No products yet...</h1>;

    if(products.length > 0) 
    {
        productList = <ProductList products={products}/>
    }

    if(isLoading)
    {
        productList = <h1 style={{"color": "#2196f3 "}}>Loading...</h1>;
    }

    return (
        <>
        <section>
            <AddProduct/>
        </section>
        <hr style={{'marginLeft': '25%', 'marginRight': '25%'}}/>
        <section>
            <button onClick={getProducts}>Get products</button>
        </section>
        <section>
            {productList}
        </section>
        </>
    );
}

export default ProductsDashboard;
