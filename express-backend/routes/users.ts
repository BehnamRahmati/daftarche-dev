import express, { Router } from 'express'
const router: Router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.status(200).send('respond with a resource')
})

export default router
