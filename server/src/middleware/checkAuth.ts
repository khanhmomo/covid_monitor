import { Context } from "../types/Context";
import { MiddlewareFn } from "type-graphql";
import { AuthenticationError } from "apollo-server-errors";

export const checkAuth: MiddlewareFn<Context> = ({ context: {req} }, next) => {
    if (!req.session.userID)
    throw new AuthenticationError('Not authenticated to perform GQL operations')

    return next()
}
