import { Request, Response } from 'express'
import prisma from '../../lib/prisma'

export async function getProxyUploads(req: Request, res: Response) {
	try {
		const { id } = req.params
		if (!id) {
			res.status(400).json({ message: 'Missing parameters' })
			return
		}
		const user = prisma.user.findUnique({
			where: {
				id,
			},
			select: {
				id: true,
			},
		})
		if (!user) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		const files = await prisma.file.findMany({
			where: {
				userId: id,
				type: 'PROXY',
			},
			orderBy: {
				createdAt: 'desc',
			},
			take: 10,
		})
		res.status(200).json({ message: 'Successfully retrieved files', files })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}

export async function uploadProxy(req: Request, res: Response) {
	try {
		const { id } = req.params
		const { url } = req.body

		if (!id || !url) {
			res.status(400).json({ message: 'Missing parameters' })
			return
		}

		const userExists = prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})
		if (!userExists) {
			res.status(404).json({ message: 'User not found' })
			return
		}

		res.status(201).json({ message: 'File uploaded successfully' })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
