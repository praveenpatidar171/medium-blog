import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from '@prisma/client/edge'
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "../zod";

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string
}
export const userRouter = new Hono<{ Bindings: Bindings }>();

// signup 
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {

        const body = await c.req.json();

        const { success } = signUpInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid signup inputs' })
        }
        const user = await prisma.user.create({
            data: {
                name: body.name,
                email: body.email,
                password: body.password,
            }
        })
        const token = await sign({ id: user.id }, c.env.JWT_SECRET);
        return c.json({ message: "User created successfully!", token });

    } catch (error) {
        c.status(411);
        return c.json({ error: "Error in user sign up" })
    }
})



//signin
userRouter.post('/signin', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    try {

        const body = await c.req.json();

        const { success } = signInInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid signin inputs' })
        }
        const userExist = await prisma.user.findUnique({
            where: {
                email: body.email,
                password: body.password,
            }
        });

        if (!userExist) {
            c.status(403);
            return c.json({ message: 'Wrong Credentials' });
        }
        const token = await sign({ id: userExist.id }, c.env.JWT_SECRET);
        c.status(200);
        return c.json({ token });

    } catch (error) {
        c.status(411);
        return c.json({ error: "Error in signin user" })
    }

})
