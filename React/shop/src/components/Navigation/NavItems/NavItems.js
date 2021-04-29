import classes from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

const navItems = (props) =>
{
    return(
        <ul className={classes.NavItems}>
            <NavItem link="/">Products</NavItem>
            <NavItem link="/checkout">Checkout</NavItem>
        </ul>
    );
}

export default navItems;