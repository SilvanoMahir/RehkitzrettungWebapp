const { createProxyMiddleware } = require('http-proxy-middleware');
const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
    env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:40552';

const context = [
    "/api/protocols",
    "/api/protocols/file",
    "/api/protocols/overview",
    "/api/regions",
    "/api/districts",
    "/api/states",
    "/api/users",
    "/api/area",
    "/api/authenticate/login",
    "/api/authenticate/register-admin",
    "/api/authenticate/register",
]

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,
        secure: false,
        headers: {
            Connection: 'Keep-Alive'
        }
    })

    app.use(appProxy)
}
