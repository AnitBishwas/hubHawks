import * as z from 'zod';

const User = z.object({
    email: z.email({pattern: z.regexes.email,}),
    password: z.string()
});

const RegisterUser = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.email({pattern: z.regexes.email}),
    password: z.string(),
    userType: z.enum(["sniper","freelancer"])
});

export {User,RegisterUser};