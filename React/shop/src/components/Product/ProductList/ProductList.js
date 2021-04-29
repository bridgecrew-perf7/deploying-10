import classes from './ProductList.module.css';
import Product from '../Product';

const ProductList = (props) => {

    const addToCheckoutHandler = (product) => {
        let checkout = JSON.parse(localStorage.getItem('checkout') || '[]');
        let productIndex = checkout.findIndex(p => p.id === product.id);
        if(productIndex >= 0) 
        {
            checkout[productIndex].count++;
        }
        else
        {
            product.count = 1;
            checkout.push(product);
        }
        localStorage.setItem('checkout', JSON.stringify(checkout));
        alert('Producto agregado correctamente!');
    }

    return(
        <ul className={classes.list}>
            {
                props.products.map((product) => 
                    <Product
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        imageUrl ={product.imageUrl}
                        addToCheckoutHandler={()=> addToCheckoutHandler(product)}
                    />
                )
            }
        </ul>
    );
}

export default ProductList;