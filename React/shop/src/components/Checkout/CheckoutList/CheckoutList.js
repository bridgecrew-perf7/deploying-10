import classes from './CheckoutList.module.css';
import Checkout from '../Checkout';

const CheckoutList = (props) => {

    return(
        <ul className={classes.list}>
            {
                props.checkoutItems.map((product) => 
                    <Checkout
                        key={product.id}
                        title={product.title}
                        price={product.price}
                        imageUrl ={product.imageUrl}
                        count={product.count}
                        removeFromCheckoutHandler={()=> props.removeFromCheckoutHandler(product)}
                    />
                )
            }
        </ul>
    );
}

export default CheckoutList;