import { setupServer } from "msw/lib/node"
import { handlers } from "./mswHandlers"

export const mockServer = setupServer(...handlers)
