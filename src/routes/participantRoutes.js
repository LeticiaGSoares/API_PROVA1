import { Router } from "express"

//importar controllers
import {registerParticipant, postFeedback, getMyEvents} from '../controllers/participantControllers.js'
//importar helpers
import {validateParticipant} from '../helpers/index.js'

const router = Router()

//rotas

router.post('/participantes/registrar', validateParticipant, registerParticipant)
router.post('/feedback', postFeedback)
router.get('/meus-eventos/:participanteId', getMyEvents)

export default router