import classes from './Product.module.css';

const Product = (props) => {
    return (
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
                <h2>{props.price}</h2>
            </div>
        </div>
    );
}

export default Product;