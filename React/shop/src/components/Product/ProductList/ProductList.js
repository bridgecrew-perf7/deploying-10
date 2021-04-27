import classes from './ProductList.module.css';
import Product from '../Product';

const ProductList = (props) => {
    return(
        <ul className={classes.list}>
            {
                props.products.map((product) => 
                    <Product
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        imageUrl ={product.imageUrl}
                    />
                )
            }
        </ul>
    );
}

export default ProductList;