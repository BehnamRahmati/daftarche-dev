import express, { Router } from 'express'
import {
	createClipboards,
	deleteClipboards,
	getUserClipboards,
	updateClipboards,
} from '../controllers/clipboards/clipboards'

const router: Router = express.Router()

router.get('/:id', getUserClipboards)

router.post('/:id', createClipboards)

router.put('/', updateClipboards)

router.delete('/:id', deleteClipboards)

export default router
