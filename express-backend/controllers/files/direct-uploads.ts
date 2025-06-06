import { Request, Response } from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import prisma from '../../lib/prisma'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

if (!fs.existsSync(uploadDir)) {
	fs.mkdirSync(uploadDir, { recursive: true })
	console.log(`Created upload directory: ${uploadDir}`)
}

const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, uploadDir)
	},
	filename: function (req, file, cb) {
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
		const extension = path.extname(file.originalname)
		cb(null, file.fieldname + '-' + uniqueSuffix + extension)
	},
})
export const upload = multer({ storage: storage })

export async function getUploads(req: Request, res: Response) {
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
				type: 'DIRECT',
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

export async function uploadFile(req: Request, res: Response) {
	try {
		const uploadedFile = req.file
		console.log(uploadedFile)
		const { id } = req.params
		if (!id || !uploadedFile) {
			res.status(400).json({ message: 'Missing parameters' })
			return
		}
		const user = prisma.user.findUnique({
			where: { id },
			select: { id: true },
		})
		if (!user) {
			res.status(404).json({ message: 'User not found' })
			return
		}
		const fileUrl = `/uploads/${uploadedFile?.filename}`
		const file = await prisma.file.create({
			data: {
				filename: uploadedFile?.originalname || '',
				mimeType: uploadedFile?.mimetype || '',
				size: uploadedFile?.size || 0,
				url: fileUrl,
				status: 'COMPLETED',
				user: { connect: { id } },
			},
		})

		res.status(201).json({ message: 'File uploaded successfully', file: file })
	} catch (error) {
		console.log(error)
		res.status(500).json({ message: 'Internal server error' })
	}
}
