import { tableName } from "../models/participantModel.js"
import conn from '../config/conn.js'

const validateParticipant = (req, res, next)=>{
    const {nome, email} = req.body
    
    if(!nome){
        return res.status(400).json({validationError: "O nome é obrigatório"})
    }
    if(!email){
        return res.status(400).json({validationError: "O email é obrigatório"})
    }

    const checkEmailSql = /*sql*/ `
        SELECT email FROM ${tableName}
        WHERE ?? = ? 
    `;

    const checkEmailSqlData = ["email", email];

    conn.query(checkEmailSql, checkEmailSqlData, async (err, data) => {
        if (err) {
            return res.status(500).json({validationError: "Não foi possivel buscar usuário, error: " + err });
        }else if (data.length > 0) {
            return res.status(500).json({validationError: "E-mail já está em uso, error: " + err });
        }else{
            next()
        }
    })
    
}

export default validateParticipant