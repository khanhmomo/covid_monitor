"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const apollo_server_errors_1 = require("apollo-server-errors");
const checkAuth = ({ context: { req } }, next) => {
    if (!req.session.userID)
        throw new apollo_server_errors_1.AuthenticationError('Not authenticated to perform GQL operations');
    return next();
};
exports.checkAuth = checkAuth;
//# sourceMappingURL=checkAuth.js.map