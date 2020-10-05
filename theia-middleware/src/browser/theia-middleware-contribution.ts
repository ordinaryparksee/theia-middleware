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
                location.href = '/logout'
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
