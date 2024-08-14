import { Router } from "express"

//importar controllers
import {registerParticipant} from '../controllers/participantControllers.js'
//importar helpers
import {validateParticipant} from '../helpers/index.js'

const router = Router()

//rotas

router.post('/registrar', validateParticipant, registerParticipant)

export default router