import { injectable } from "inversify";
import { Application } from "express";
import { BackendApplicationContribution } from "@theia/core/lib/node/backend-application";

require("dotenv").config();
var process = require("process");

@injectable()
export class TheiaMiddlewareContribution implements BackendApplicationContribution {

    configure(app: Application): void {
        app.use((request, response, next) => {
            const auth = {
                login: process.env.AUTH_USER || 'admin',
                password: process.env.AUTH_PASS || 'admin',
                realm: process.env.AUTH_REALM || 'authenticate',
                fallback_msg: process.env.AUTH_FALLBACK_MSG || 'Authentication required.'
            }

            const b64auth = (request.headers.authorization || '').split(' ')[1] || ''
            const [login, password] = new Buffer(b64auth, 'base64').toString().split(':')

            if (!login || !password || login !== auth.login || password !== auth.password) {
                response.set('WWW-Authenticate', `Basic realm="${auth.realm}"`)
                response.status(401).send(auth.fallback_msg)
                return
            } else {
                next()
            }
        })
    }
}
