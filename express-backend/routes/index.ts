import express, { Router } from 'express'
const router: Router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
	res.status(200).render('index', { title: 'Express' })
})

export default router
