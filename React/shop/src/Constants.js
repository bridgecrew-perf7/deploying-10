const prod = {
    url:{
        productsApi: 'https://reactnodeexample.wn.r.appspot.com/product', 
        checkoutApi: 'https://checkout-dot-myshop-311923.wn.r.appspot.com'
    }
}

const dev = {
    url:{
        productsApi: 'http://localhost:8080/product',
        checkoutApi: ''
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;