"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const zod_1 = require("zod");
function user(user) {
    const validationUser = zod_1.z.object({
        name: zod_1.z.string(),
        lastname: zod_1.z.string(),
        login: zod_1.z.string(),
        email: zod_1.z.string(),
        password: zod_1.z.string(),
    });
    const validation = validationUser.parse(user);
    return user;
}
exports.user = user;
