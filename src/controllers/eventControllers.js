import {v4 as uuidv4} from 'uuid'
import conn from '../config/conn.js'
import {tableName} from '../models/eventModel.js'

export const createEvent= (req, res) => {
    const {titulo, data, palestrantesId} = req.body
    const id = uuidv4()

    const insertSql = /*sql*/`
        INSERT INTO ${tableName} (??, ??, ??)
        VALUES (?, ?, ?)
    `

    const insertSqlData = [
        "event_id", "titulo", "data",
        id, titulo, data
    ]

    conn.query(insertSql, insertSqlData, async (err, data) => {
        if (err) {
            return res.status(500).json({validationError: "Erro interno do servidor " + err });
        }else if (data.affectedRows == 0) {
            return res.status(404).json({validationError: "JNão foi possivel cadastrar evento, error: " + err });
        }
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
    const {palestranteId, eventoId} = req.body
    
    const checkLecturersSql = /*sql*/`
        SELECT ?? from lecturers
    `

    const checkLecturersSqlData = "lecturer_id"

    conn.query(checkLecturersSql, checkLecturersSqlData, async (err, data)=>{
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar ID de palestrante, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: "Não existe nenhum palestrante no banco de dados"});
        }
    })
}
