import classes from './Checkout.module.css';

const Checkout = (props) => {
    return (
        <div className={classes.mainContainer}>
            <div className={classes.container}>
                <div className={classes.column}>
                    <a target="_blank" href={props.imageUrl} rel="noreferrer">
                        <img src={props.imageUrl} alt="productImage"/> 
                    </a>
                </div>
                <div className={classes.column}>
                    <h2>{props.title}</h2>
                </div>
                <div className={classes.column}>
                    <h2 style={{marginLeft:'2rem'}}>${props.price}</h2>
                </div>
                <div className={classes.column}>
                    <h2 style={{marginLeft:'2rem'}}>X{props.count}</h2>
                </div>
            </div>
            <div className={classes.column}>
            <button onClick={props.removeFromCheckoutHandler} style={{padding:'0.4rem 1rem', marginRight:'0.5rem'}}>Remove</button>
            </div>
        </div>
        
    );
}

export default Checkout;