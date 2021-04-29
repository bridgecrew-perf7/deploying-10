import classes from './Toolbar.module.css';
import NavItems from '../NavItems/NavItems';

const toolbar = (props) =>
{
    return(
        <header className={classes.Toolbar}>
            <nav>
                <NavItems/>
            </nav>
        </header>
    );
}

export default toolbar;