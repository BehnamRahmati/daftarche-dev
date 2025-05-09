import express, { Router } from 'express'

import { getUploads, upload, uploadFile } from '../controllers/files/direct-uploads'
import { getProxyUploads, uploadProxy } from '../controllers/files/proxy-Uploads'
const router: Router = express.Router()

router.get('/:id/uploads', getUploads)

router.get('/:id/proxy', getProxyUploads)

router.post('/:id/upload', upload.single('file'), uploadFile)

router.post('/:id/proxy', uploadProxy)

export default router
