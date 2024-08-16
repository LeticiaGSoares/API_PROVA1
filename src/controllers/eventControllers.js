import {v4 as uuidv4} from 'uuid'
import conn from '../config/conn.js'
import {tableName} from '../models/eventModel.js'

export const createEvent= (req, res) => {
    const {titulo, data, palestrantesId} = req.body
    const event_id = uuidv4()

    const createEventSql = /*sql*/`
        INSERT INTO ${tableName} (??, ??, ??)
        VALUES (?, ?, ?)
    `

    const createEventSqlData = [
        "event_id", "titulo", "data",
        event_id, titulo, data
    ]

    conn.query(createEventSql, createEventSqlData, async (err, data) => {
        if (err) {
            return res.status(500).json({validationError: "Erro interno do servidor " + err });
        }else if (data.affectedRows == 0) {
            return res.status(404).json({validationError: "Não foi possivel cadastrar evento, error: " + err });
        }
    })

    palestrantesId.forEach(lecturer_id => {
        const id = uuidv4()

        const insertLecturerIdSql = /*sql*/`
            INSERT INTO eventLecturers 
            (??, ??, ??) VALUES (?, ?, ?)
        `

        const insertLecturerData = ["id", "event_id", "lecturer_id", id, event_id, lecturer_id]

        conn.query(insertLecturerIdSql, insertLecturerData, (err, data)=> {
            if (err) {
                return res.status(500).json({insertError: "Erro interno do servidor: " + err });
            }else if (data.affectedRows == 0) {
                return res.status(500).json({insertError: "Não foi possível inserir dados no banco: " + err});
            }else{
                res.status(201).json({message: "Dados inseridos com sucesso no banco"})
            }
        })

    })
}
export const getSchedule= (req, res) => {
    const checkSql = /*sql*/`
        SELECT * FROM events
    `

    conn.query(checkSql, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: "Não existe nenhum evento no banco de dados"});
        }

        res.status(200).json({Eventos: data})
    })
    
}
export const subscribeParticipant = (req, res) => {
    const {participanteId, eventoId} = req.body
    
    const checkParticipantsSql = /*sql*/`
        SELECT ?? from participants
        WHERE ?? = ?
    `

    const checkParticipantsSqlData = [
        "participant_id", 
        "participant_id", participanteId
    ]

    conn.query(checkParticipantsSql, checkParticipantsSqlData, async (err, data)=>{
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar participantes, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: "Não existe nenhum participante com esse ID no banco de dados"});
        }

    const checkEventsSql = /*sql*/`
        SELECT ?? FROM events
        WHERE ?? = ?
    `
    const checkEventsSqlData = [
        "event_id", 
        "event_id", eventoId
    ]
    conn.query(checkEventsSql, checkEventsSqlData, (err, data)=> {

        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `Não existe o evento de id ${eventoId} no banco de dados`});
        }

        const checkEventParticipantsSql = /*sql*/`
            SELECT * FROM eventParticipants 
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
            }else if (data.length > 0) {
                return res.status(404).json({validationError: `O participante já está cadastro no evento de ID ${eventoId}`});
            }


            const id = uuidv4()
    
            const insertSql = /*sql*/`
                INSERT INTO eventParticipants (??, ??, ??)
                VALUES (?, ?, ?)
            `
    
    
            const insertSqlData = [
                "id", "event_id", "participant_id",
                id, eventoId, participanteId
            ]
    
            conn.query(insertSql, insertSqlData, (err, data) => {
                if(err){
                    return res.status(500).json({registerError: "Erro ao cadastrar participante em evento: " + err})
                }
        
                res.status(201).json({message: "Participante registrado em evento com sucesso"})
            })
        })

    })

    })
}
export const getMostActiveLecturer = (req, res)=> {
    console.log("[GET] /palestrante-mais-ativo")
}
export const getMostPopular = (req, res) => {
    console.log("[GET] /mais-popular")
}
export const editEvent = (req, res)=> {
    console.log("[PUT] /editar")
}
export const cancelEvent = (req, res)=> {
    const {eventoId} = req.body

    //helpers? sem tempo, irmão.

    const checkSql = /*sql*/`
        SELECT ?? FROM events
        WHERE ?? = ?
    `
    const checkSqlData = [
        "event_id", 
        "event_id", eventoId
    ]
    conn.query(checkSql, checkSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `Não existe o evento de id ${eventoId} no banco de dados`});
        }

        console.log('Evento existe')
    })

    const deleteEventLecturersSql = /*sql*/`
        DELETE FROM eventLecturers
        WHERE ?? = ?
    `
    const deleteEventParticipantsSql = /*sql*/`
        DELETE FROM eventParticipants
        WHERE ?? = ?
    `
    const deleteEventsSql = /*sql*/`
        DELETE FROM events
        WHERE ?? = ?
    `
    const deleteSqlData = ["event_id", eventoId]
    conn.query(deleteEventLecturersSql, deleteSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `Não existe o evento de id ${eventoId} no banco de dados`});
        }

        console.log("eventLecturers deletado")
    })
    conn.query(deleteEventParticipantsSql, deleteSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `Não existe o evento de id ${eventoId} no banco de dados`});
        }

        console.log("eventParticipants deletado")
    })
    conn.query(deleteEventsSql, deleteSqlData, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: `Não existe o evento de id ${eventoId} no banco de dados`});
        }

        return res.status(200).json({message: "Evento deletado com sucesso"})
    })
}