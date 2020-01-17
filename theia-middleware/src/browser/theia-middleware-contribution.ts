import { injectable } from "inversify"
import { CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry } from "@theia/core/lib/common"
import { CommonMenus } from "@theia/core/lib/browser"

export const TheiaMiddlewareCommand = {
    id: "TheiaMiddleware.command",
    label: "Logout"
}

@injectable()
export class TheiaMiddlewareCommandContribution implements CommandContribution {

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TheiaMiddlewareCommand, {
            execute: () => {
                let logoutUser = process.env.AUTH_LOGOUT_USER || 'LOGOUT'
                let logoutUrl = `${location.protocol}//${logoutUser}@${location.hostname}`
                if (location.port) {
                    logoutUrl += ":" + location.port
                }
                location.href = logoutUrl
            }
        })
    }

}

@injectable()
export class TheiaMiddlewareMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.FILE_SETTINGS, {
            commandId: TheiaMiddlewareCommand.id,
            label: TheiaMiddlewareCommand.label
        })
    }

}
