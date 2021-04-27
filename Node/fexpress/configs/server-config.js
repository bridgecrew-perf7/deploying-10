
if(process.env.NODE_ENV == 'production')
{
    module.exports = {
        scheme: 'https',
        server: 'myshop-311923.wn.r.appspot.com',
        ip: process.env.IP,
        port: process.env.PORT || 8080
    };
}
else
{
    module.exports = {
        scheme: 'http',
        server: 'localhost',
        ip: '127.0.0.1',
        port: process.env.PORT || 8080
    };
}

