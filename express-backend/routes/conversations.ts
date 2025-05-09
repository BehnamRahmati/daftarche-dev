import express, { Router } from 'express'

import { adduserToContacts, getContacts } from '../controllers/conversations/contact'
const router: Router = express.Router()

router.get('/:id/contacts', getContacts)

router.post('/:id/add-contact', adduserToContacts)

export default router
