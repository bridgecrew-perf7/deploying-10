const prod = {
    url:{
        productsApi: 'https://myshop-311923.wn.r.appspot.com/product'
    }
}

const dev = {
    url:{
        productsApi: 'http://localhost:8080/product'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;