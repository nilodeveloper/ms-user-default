import { z } from "zod";

export function credentials(credentials: any) {
    const validationCredentials = z.object({
        email: z.string(),
        password: z.string(),
    });
    const validation = validationCredentials.safeParse(credentials);
    return validation;
}