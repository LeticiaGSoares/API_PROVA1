import { Router } from "express"

//importar controllers
import {createEvent, getSchedule, subscribeParticipant} from '../controllers/eventControllers.js'
//importar helpers
import {validateEvent} from '../helpers/index.js'

const router = Router()

//rotas
router.post('/criar', validateEvent, createEvent) //cria novo evento
router.get('/agenda', getSchedule) //lista todos os eventos
router.post('/inscrever', subscribeParticipant) //inscreve um participante em um evento

export default router