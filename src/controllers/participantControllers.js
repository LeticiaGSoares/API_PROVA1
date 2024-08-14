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