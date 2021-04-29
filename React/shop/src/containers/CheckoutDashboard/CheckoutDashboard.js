import { useState, useEffect } from 'react';
import { config } from './../../Constants';
import axios from 'axios';
import CheckoutList from './../../components/Checkout/CheckoutList/CheckoutList';
import Invoice from './../../components/Invoice/Invoice';


function CheckoutDashboard() {

    const [checkout, setCheckout] = useState([]);
    const [purchases, setPurchases] = useState([]);
    const [isLoadingPurchases, setIsLoadingPurchases] = useState(false);

    useEffect(() => {
        setCheckout(JSON.parse(localStorage.getItem('checkout') || '[]'));
    }, []);

    const removeFromCheckoutHandler = (product) => {
        let checkout = JSON.parse(localStorage.getItem('checkout') || '[]');
        let productIndex = checkout.findIndex(p => p.id = product.id);
        if(productIndex >= 0) 
        {
            checkout.splice(productIndex, 1);
        }
        localStorage.setItem('checkout', JSON.stringify(checkout));
        setCheckout(JSON.parse(localStorage.getItem('checkout') || '[]'));
    }

    const getInvoices = () => {
        console.log('getInvoices');
        setIsLoadingPurchases(true);
        axios({
            method: 'GET',
            url: `${config.url.checkoutApi}/purchase`
        })
        .then((response) => {
            console.log(response.data);
            setPurchases(response.data);
            setIsLoadingPurchases(false);
        })
        .catch((error) => {
            console.log(error);
            setIsLoadingPurchases(false);
        });
    }

    const buyItems = () => {
        let checkout = JSON.parse(localStorage.getItem('checkout') || '[]')
        let checkoutPost = checkout.map(product => ({id: product.id, count: product.count}));
        let bodyPost = {checkout: checkoutPost};
        console.log(bodyPost);
        axios({
            method: 'POST',
            url: `${config.url.checkoutApi}/purchase`,
            data: bodyPost,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log(response.data);
            localStorage.setItem('checkout', '[]');
            setCheckout(JSON.parse(localStorage.getItem('checkout') || '[]'));
            alert('se han comprado correctamente los productos');
        })
        .catch((error) => {
            console.log(error);
        });
    }


    let checkoutList = <h1 style={{"color": "#e0e0e0"}}>No products yet...</h1>;
    let buyButton = null;
    let purchasesList = <h1 style={{"color": "#e0e0e0"}}>No purchases yet...</h1>;

    if(checkout.length > 0) 
    {
        checkoutList = <CheckoutList checkoutItems={checkout} removeFromCheckoutHandler={removeFromCheckoutHandler}/>
        buyButton = <button onClick={buyItems}>Purchase</button>
    }

    if(purchases.length > 0)
    {
        purchasesList = purchases.map((purchase, i) => <Invoice key={purchase.invoice_ID+'_invoice'} {...purchase}/>)
    }

    if(isLoadingPurchases)
    {
        purchasesList = <h1 style={{"color": "#2196f3 "}}>Loading...</h1>;
    }

    return (
        <>
        <section>
            {checkoutList}
        </section>
        <section>
            {buyButton}
        </section>
        <section>
            <button onClick={getInvoices}>Get purchases</button>
        </section>
        <section>
            {purchasesList}
        </section>
        </>
    );
}

export default CheckoutDashboard;
