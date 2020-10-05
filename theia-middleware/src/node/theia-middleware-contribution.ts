import { injectable } from "inversify"
import { Application } from "express"
import { BackendApplicationContribution } from "@theia/core/lib/node/backend-application"

require("dotenv").config()
var QRCode = require('qrcode')
var process = require("process")
var speakeasy = require("speakeasy")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var CryptoJS = require('crypto-js')

@injectable()
export class TheiaMiddlewareContribution implements BackendApplicationContribution {

    configure(app: Application): void {
        // app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cookieParser())
        
        app.use((request, response, next) => {
            const authType = (process.env.AUTH_TYPE || 'BASIC').toUpperCase()

            // Use basic auth
            if (authType === 'BASIC') {
                const authUser = process.env.AUTH_USER || 'admin'
                const authPassword = process.env.AUTH_PASS || 'admin'
                const realm = process.env.AUTH_REALM || 'authenticate'
                const fallbackMsg = process.env.AUTH_FALLBACK_MSG || 'Authentication required.'
                const base64Auth = (request.headers.authorization || '').split(' ')[1] || ''
                const [user, password] = Buffer.from(base64Auth, 'base64').toString().split(':')

                // Unauthenticated
                if (!user || !password || user !== authUser || password !== authPassword) {
                    if (request.path !== '/logout') {
                        response.set('WWW-Authenticate', `Basic realm="${realm}"`)
                        response.status(401).send(fallbackMsg)
                    }
                    else {
                        next()
                    }
                }
                // Authenticated
                else {
                    next()
                }
            }
            // Use One-time password
            else if (authType === 'OTP') {
                // Initialize
                if (!process.env.AUTH_OTP_SECRET) {
                    let secret = speakeasy.generateSecret()
                    process.env.AUTH_OTP_SECRET = secret.base32
                    return response.redirect(`/otp/setup?token=${process.env.AUTH_OTP_SECRET}`)
                }

                let verified = false
                if (request.cookies.auth_token) {
                    let authToken = JSON.parse(CryptoJS.AES.decrypt(request.cookies.auth_token, process.env.AUTH_OTP_SECRET).toString(CryptoJS.enc.Utf8))
                    if (authToken && authToken.token && authToken.time) {
                        let verifyToken = speakeasy.totp({
                            secret: process.env.AUTH_OTP_SECRET,
                            encoding: 'base32',
                            time: authToken.time
                        })
                        verified = authToken.token === verifyToken
                    }
                }
                // Unauthenticated
                if (!verified) {
                    if (['/otp/auth', '/otp/setup', '/logout'].indexOf(request.path) > -1) next()
                    else response.redirect('/otp/auth')
                }
                else {
                    next()
                }
            }
            // Pass to unknown
            else {
                next()
            }
        })

        app.get('/logout', (request, response) => {
            if (process.env.AUTH_TYPE === 'BASIC') {
                let logoutUser = process.env.AUTH_LOGOUT_USER || 'LOGOUT'
                let logoutUrl = `${request.protocol}://${logoutUser}@${request.headers.host}`
                return response.redirect(logoutUrl)
            }
            if (process.env.AUTH_TYPE === 'OTP') {
                response.clearCookie('auth_token')
                return response.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Theia OTP Setup</title>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.8/dist/css/uikit.min.css" />
                    </head>
                    <body>
                        <div class="uk-container uk-text-center">
                            <div class="uk-margin-top">Successfully logged out</div>
                            <div>
                                <a href="${request.baseUrl}/">Go back to IDE</a>
                            </div>
                        </div>
                    </body>
                </html>
                `)
            }
        })

        app.get('/otp/setup', (request, response) => {
            const otpName = process.env.AUTH_OTP_NAME || 'Theia'
            QRCode.toDataURL(`otpauth://totp/${otpName}?secret=${request.query.token}`, function(err: Error, dataUrl: String) {
                response.send(`
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Theia OTP Setup</title>
                        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.8/dist/css/uikit.min.css" />
                    </head>
                    <body>
                        <div class="uk-container uk-text-center">
                            <h1>OTP Setup</h1>
                            <div>Your OTP secret key is <code>${request.query.token}</code></div>
                            <div>!!IMPORTANT!!</div>
                            <div>You have to save secret key to <code>.env</code> file like this below</div>
                            <code>AUTH_OTP_SECRET="${request.query.token}"</code>
                            <div>
                                <img src="${dataUrl}">
                            </div>
                            <div>
                                Click <a href="/">this</a> for authentication after you save secret key
                            </div>
                        </div>
                    </body>
                </html>
                `)
            })
        })

        app.get('/otp/auth', (request, response) => {
            response.send(`
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Theia OTP Setup</title>
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.8/dist/css/uikit.min.css" />
                </head>
                <body>
                    <div class="uk-container uk-text-center">
                        <form method="post" action="/otp/auth">
                            <div class="uk-margin-top">
                                <input name="token" class="uk-input uk-form-width-medium uk-form-medium" type="text" placeholder="OTP Token">
                                <input type="submit" value="Verify" class="uk-button uk-button-default"/>
                            </div>
                        </form>
                    </div>
                </body>
            </html>
            `)
        })

        app.post(`/otp/auth`, (request, response) => {
            let token = request.body.token
            let verified = speakeasy.totp.verify({
                secret: process.env.AUTH_OTP_SECRET,
                encoding: 'base32',
                token: token,
                step: 30
            })
            if (verified) {
                response.cookie('auth_token', CryptoJS.AES.encrypt(JSON.stringify({
                    token: token,
                    time: Math.round((new Date()).getTime() / 1000)
                }), process.env.AUTH_OTP_SECRET).toString())
                response.redirect('/')
            } else {
                response.redirect('/otp/auth')
            }
        })
        
    }
}
