import {v4 as uuidv4} from 'uuid'
import conn from '../config/conn.js'
import {tableName} from '../models/lecturerModel.js'

export const registerLecturer = (req, res) => {
    const {nome, expertise} = req.body
    const id = uuidv4()

    const insertSql = /*sql*/`
        INSERT INTO ${tableName} (??, ??, ??) VALUES (?, ?, ?)
    `

    const insertSqlData = ["lecturer_id","nome", "expertise", id, nome, expertise] 

    conn.query(insertSql, insertSqlData, (err, data)=> {
        if(err){
            return res.status(500).json({registerError: "Erro ao cadastrar palestrante: " + err})
        }

        res.status(201).json({message: "Palestrante registrado com sucesso: ", palestrante: req.body})
    })
}

export const getAllLecturers = (req, res) => {
    const checkLecturer = /*sql*/`
        SELECT * FROM lecturers
    `

    conn.query(checkLecturer, (err, data)=> {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar palestrantes, error: " + err });
        }else if (data.length == 0) {
            return res.status(404).json({validationError: "Não existe nenhum palestrante no banco de dados"});
        }

        res.status(200).json(data)
    })
    
}