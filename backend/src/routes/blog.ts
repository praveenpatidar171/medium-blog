import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from '../zod';

type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET: string,
}



export const blogRouter = new Hono<{
    Bindings: Bindings,
    Variables: {
        userId: string
    }

}>();


blogRouter.use('/*', async (c, next) => {
    try {
        const header = c.req.header("Authorization") || "";
        if (!header.startsWith('Bearer')) {
            c.status(403);
            return c.json({ message: "Invalid token" })
        }
        const token = header.split(" ")[1];
        const response = await verify(token, c.env.JWT_SECRET);
        if (!response.id) {
            c.status(403);
            return c.json({ error: 'Not Authorized' })
        }
        c.set("userId", String(response.id))
        await next();

        console.log(c.get('userId'));

    } catch (error) {
        c.status(403);
        return c.json({ error: 'Authentication failed' })
    }
})
//get a single blog
blogRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.post.findUnique({
            where: {
                id: c.req.param('id')
            },
        })
        c.status(200);
        return c.json({ blog })
    } catch (error) {
        console.log(error);
        c.status(411);
        return c.json({ error: 'Error in fetching the blog' })
    }

})

//get all the blogs
blogRouter.get('/all/bulk', async (c) => {

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const blogs = await prisma.post.findMany();

        c.status(200);
        return c.json({ blogs: blogs })

    } catch (error) {
        c.status(411);
        console.log(error);
        return c.json({ error: "Error in fetching all the blogs" });
    }

})

//create a blog
blogRouter.post('/', async (c) => {

    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());
    try {
        const body = await c.req.json();
        const { success } = createBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid inputs for posting a blog' })
        }
        const blog = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                published: false,
                autherId: c.get('userId')
            }
        })
        c.status(201);
        return c.json({ id: blog.id })
    } catch (error) {
        c.status(411);
        console.log(error);
        return c.json({ error: 'Error in posting a blog' });
    }
})

//update a blog
blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({ datasourceUrl: c.env.DATABASE_URL }).$extends(withAccelerate());

    try {
        const body = await c.req.json();
        const { success } = updateBlogInput.safeParse(body);
        if (!success) {
            c.status(400);
            return c.json({ message: 'Invalid inputs for updating a blog' })
        }
        const blog = await prisma.post.update({
            
            where: {
                id: body.id
            },
            data: {
                content: body.content,
                title: body.title
            }
        })
        c.status(200);
        return c.json({ id: blog.id })
    } catch (error) {
        c.status(411);
        console.log(error);
        return c.json({ error: "Error in updating a blog" })
    }
})
