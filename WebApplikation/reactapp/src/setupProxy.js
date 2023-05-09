const { createProxyMiddleware } = require('http-proxy-middleware');

const context = [
    "/api/protocol",
    "/api/regions",
    "/api/users",
];

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: 'https://localhost:7200',
        secure: false
    });

    app.use(appProxy);
};
