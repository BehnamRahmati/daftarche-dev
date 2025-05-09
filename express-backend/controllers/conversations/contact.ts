import { Request, Response } from 'express'
import prisma from '../../lib/prisma'

export async function getContacts(req: Request, res: Response) {
	try {
		const { id } = req.params
		if (!id) {
			res.status(400).send({ message: 'paramaters are required' })
			return
		}
		const userExists = await prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})
		if (!userExists) {
			res.status(404).send({ message: 'user not found' })
			return
		}
		const contacts = await prisma.contact.findMany({
			where: { ownerId: id },
			include: { contact: true },
		})
		res.status(200).send({ message: 'successfully fetched contacts', contacts })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: 'server failed' })
	}
}

export async function adduserToContacts(req: Request, res: Response) {
	try {
		const { id } = req.params
		const { contactEmail } = req.body
		if (!id || !contactEmail) {
			res.status(400).send({ message: 'paramaters are required' })
			return
		}
		const userExists = await prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})
		const contactExists = await prisma.user.findUnique({
			where: { email: contactEmail },
			select: { id: true },
		})

		if (!userExists || !contactExists) {
			res.status(404).send({ message: 'user not found' })
			return
		}

		const contact = await prisma.contact.create({
			data: {
				owner: { connect: { id } },
				contact: { connect: { email: contactEmail } },
			},
			include: {
				owner: true,
				contact: true,
			},
		})
		res.status(200).send({ message: 'successfully created contact', contact })
	} catch (e) {
		console.log(e)
		res.status(500).send({ message: 'server failed' })
	}
}
