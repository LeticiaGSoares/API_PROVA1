import { Router } from "express"

//importar controllers
import {registerLecturer, getAllLecturers} from '../controllers/lecturerControllers.js'
//importar helpers
import {validateLecturer} from '../helpers/index.js'

const router = Router()

//rotas

router.post('/palestrantes', validateLecturer, registerLecturer)
router.get('/palestrantes', getAllLecturers)

export default router