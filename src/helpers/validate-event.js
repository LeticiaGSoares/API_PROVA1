import { tableName } from "../models/eventModel.js"
import conn from '../config/conn.js'

const validateEvent = (req, res, next) => {
    const {titulo, data, palestrantesId} = req.body

    if(!titulo){
        return res.status(400).json({validationError: "O titulo é obrigatório"})
    }
    if(!data){
        return res.status(400).json({validationError: "A data é obrigatória"})
    }
    if(!palestrantesId){
        return res.status(400).json({validationError: "O(s) ID's dos palestrantes são obrigatórios"})
    }

    const checkEventSql = /*sql*/`
        SELECT titulo from events
        WHERE ?? = ?
    `
    
    const checkEventSqlData = ["titulo", titulo]

    conn.query(checkEventSql, checkEventSqlData, async (err, data)=>{
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar eventos, error: " + err });
        }else if (data.length > 0) {
            return res.status(404).json({validationError: "Já existe um evento com esse título no banco de dados" });
        }

    })

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

        palestrantesId.map(id => {
            let dataCheck = false
            data.map(data => {
                if(data.lecturer_id === id){
                    return dataCheck = true
                }
            })

            if(!dataCheck){
                return res.status(404).json({validateError: `${id} não existe no banco de dados`})
            }else{
                console.log("ID's de palestrantes OK")
            }
        })
        next()
    })

    // palestrantesId.forEach(lecturer_id => {
    //     const checkSql = /*sql*/`
    //         SELECT * FROM lecturers
    //         WHERE ?? = ?
    //     `
    //     const checkSqlData = ["lecturer_id", lecturer_id]

    //     conn.query(checkSql, checkSqlData, (err, info) => {
            
    //         if (err) {
    //             return res.status(500).json({validationError: "Não foi possivel buscar palestrantes, error: " + err });
    //         }else if (info.length == 0) {
    //             return res.status(404).json({validationError: `O palestrante de id ${lecturer_id} não existe no banco de dados`});
    //         }
    //     })
        
        
    // })
    
}

export default validateEvent