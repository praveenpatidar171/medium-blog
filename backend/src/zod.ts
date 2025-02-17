import z from 'zod'
export const signUpInput = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6)
})
export const signInInput = z.object({
    email: z.string().email(),
    password: z.string().min(6)
})
export const createBlogInput = z.object({
    title: z.string(),
    content: z.string()
})
export const updateBlogInput = z.object({
    id: z.string(),
    title: z.string().optional(),
    content: z.string().optional()
}) 