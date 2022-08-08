import express from "express"
import { createOption } from "../controllers/option.js"

const router = express.Router()

// router.get('/sources, ')

router.post('/options', createOption)

export default router;