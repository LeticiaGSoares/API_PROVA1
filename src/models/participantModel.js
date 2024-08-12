import conn from '../config/conn.js'
import {tableName as lecturerTable} from './lecturerModel.js'
export const tableName = "participants"

const tableParticipants = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        participant_id varchar(60) primary key,
        nome varchar(255) not null,
        email varchar(100) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableParticipants, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})