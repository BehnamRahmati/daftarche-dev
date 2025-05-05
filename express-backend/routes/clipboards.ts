import express, { Request, Response, Router } from 'express'
import prisma from '../lib/prisma'
const router: Router = express.Router()

router.get('/:id', async function (req, res) {
	try {
		const { id } = req.params
		if (!id) {
			res.status(400).send({ message: 'missing parameters' })
			return
		}
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: { id: true },
		})

		if (!user) {
			res.status(404).send({ message: 'user not found' })
			return
		}
		const clipboards = await prisma.clipboard.findMany({
			where: { user: { id } },
			orderBy: {
				createdAt: 'desc',
			},
		})
		res.status(200).send({ clipboards })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'failed' })
	}
})

router.post('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		if (!id) {
			res.status(400).send({ message: 'missing parameters' })
			return
		}
		const { content } = req.body

		if (!content) {
			res.status(400).send({ message: 'missing parameters' })
			return
		}

		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			select: { id: true },
		})

		if (!user) {
			res.status(404).send({ message: 'user not found' })
			return
		}

		const clipboard = await prisma.clipboard.create({
			data: {
				content,
				user: { connect: { id } },
			},
		})

		res.status(201).send({ message: 'successfully created clipboard', clipboard })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'failed to create clipboard' })
	}
})

router.put('/', async (req, res) => {
	try {
		const { clipboardId, content } = req.body

		if (!clipboardId || !content) {
			res.status(400).send({ message: 'missing parameters' })
			return
		}
		const clipboardExists = await prisma.clipboard.findUnique({
			where: {
				id: clipboardId,
			},
			select: { id: true },
		})

		if (!clipboardExists) {
			res.status(404).send({ message: 'clipboard not found' })
			return
		}
		const clipboard = await prisma.clipboard.update({
			where: {
				id: clipboardId,
			},
			data: {
				content,
			},
		})
		res.status(201).send({ message: 'successfully created clipboard', clipboard })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'failed to create clipboard' })
	}
})

router.delete('/:id', async (req: Request, res: Response) => {
	try {
		const { id } = req.params
		if (!id) {
			res.status(400).send({ message: 'missing parameters' })
			return
		}
		const clipboard = await prisma.clipboard.delete({
			where: {
				id,
			},
		})
		res.status(200).send({ message: 'successfully deleted clipboard', clipboard })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'failed to delete clipboard' })
	}
})

export default router
