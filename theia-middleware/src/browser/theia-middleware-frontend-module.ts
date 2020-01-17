import { TheiaMiddlewareCommandContribution, TheiaMiddlewareMenuContribution } from "./theia-middleware-contribution"
import { CommandContribution, MenuContribution } from "@theia/core/lib/common"
import { ContainerModule } from "inversify"

export default new ContainerModule(bind => {
    bind(CommandContribution).to(TheiaMiddlewareCommandContribution)
    bind(MenuContribution).to(TheiaMiddlewareMenuContribution)
})
