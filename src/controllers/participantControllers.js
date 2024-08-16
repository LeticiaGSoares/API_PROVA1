import {v4 as uuidv4} from 'uuid'
import conn from '../config/conn.js'
import {tableName} from '../models/participantModel.js'

export const registerParticipant= (req, res) => {
    const {nome, email} = req.body

    const id = uuidv4()

    const insertSql = /*sql*/`
        INSERT INTO ${tableName} (??, ??, ??) VALUES (?, ?, ?)
    `

    const insertSqlData = [
        "participant_id","nome", "email", 
        id, nome, email]

    conn.query(insertSql, insertSqlData, (err)=> {

        if(err){
            return res.status(500).json({registerError: "Erro ao cadastrar participante: " + err})
        }

        res.status(201).json({message: "Participante registrado com sucesso", participante: req.body})
    })
}
export const postFeedback = (req, res) => {
    console.log("[POST] /feedback")

    const {participanteId, eventoId, nota, comentario} = req.body

    if(!nota){
        return res.status(400).json({validationError: "O titulo é obrigatório"})
    }
    if(!comentario){
        return res.status(400).json({validationError: "O comentário é obrigatória"})
    }
    if(!eventoId){
        return res.status(400).json({validationError: "O ID do evento é obrigatório"})
    }
    if(!participanteId){
        return res.status(400).json({validationError: "O ID do palestrante é obrigatório"})
    }

    const checkEventParticipantsSql = /*sql*/`
        SELECT * FROM eventsParticipants
        WHERE ?? = ?
        AND ?? = ?
    `
    const checkEventParticipantsSqlData = [
        "event_id", eventoId,
        "participant_id", participanteId
    ]

    conn.query(checkEventParticipantsSql, checkEventParticipantsSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar participantes de eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `O participante não teve presença no evento ${eventoId}`});
        }

        const id = uuidv4()

        const inserSql = /*sql*/`
            INSERT INTO eventFeedbacks
            (??, ??, ??, ??, ??) VALUES
            (?, ?, ?, ?, ?)
        `

        const inserSqlData = [
            "id", "event_id", "participant_id", "nota", "comentario",
            id, eventoId, participanteId, nota, comentario
        ]

        conn.query(inserSql, inserSqlData, (err, data)=> {
            if(err){
                return res.status(500).json({registerError: "Erro ao cadastrar feedback de participante para evento: " + err})
            }
    
            res.status(201).json({message: "Feedback registrado com sucesso"})
        })
    })

}
export const getMyEvents = (req, res) => {
    const participant_id = req.params.participanteId

    const checkParticipantSql = /*sql*/`
        SELECT * FROM eventParticipants
        WHERE ?? = ? 
    `

    const checkParticipantSqlData = ["participant_id", participant_id]

    conn.query(checkParticipantSql, checkParticipantSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar participantes, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: "Não existe nenhum participante com esse ID no banco"});
        }

        res.status(200).json(data)
    })
}