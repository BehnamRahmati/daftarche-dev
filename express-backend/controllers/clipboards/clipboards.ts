import { Request, Response } from 'express'
import prisma from '../../lib/prisma'

export async function getUserClipboards(req: Request, res: Response) {
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
			take: 10,
		})
		res.status(200).send({ clipboards })
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: 'failed' })
	}
}

export async function createClipboards(req: Request, res: Response) {
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
}

export async function updateClipboards(req: Request, res: Response) {
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
}

export async function deleteClipboards(req: Request, res: Response) {
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
}
