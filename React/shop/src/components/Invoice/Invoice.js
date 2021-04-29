const Invoice = (props) => {
    return (
        <ol>
            <li><b>{props.invoice_ID}</b>
                <ol>
                    {
                        props.invoiceDetails.map(product => <li style={{textAlign: "left"}}key={product.product_ID+'_invoiceDetail'}><b style={{color: 'gray'}}>ID:</b> {product.product_ID} [<b style={{color: 'gray'}}>Cantidad:</b> {product.count}  <b style={{color: 'gray'}}>Precio unitario:</b>{product.individual_PRICE}]</li>)
                    }
                </ol>
            </li>
        </ol>
    );
}

export default Invoice;