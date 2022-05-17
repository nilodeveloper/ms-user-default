import { z } from "zod";

export function user(user: any) {
    const validationUser = z.object({
        name: z.string(),
        lastname: z.string(),
        login: z.string(),
        email: z.string(),
        password: z.string(),
    });
    const validation = validationUser.parse(user);
    return user;
}