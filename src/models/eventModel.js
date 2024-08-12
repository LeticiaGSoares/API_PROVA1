import conn from '../config/conn.js'
import {tableName as lecturerTable} from './lecturerModel.js'
export const tableName = "events"

const tableEvents = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        event_id varchar(60) primary key,
        nome varchar(255) not null,
        descricao varchar(255) not null,
        lecturer_id varchar(60) not null,
        data_inicio DATETIME not null,
        data_final DATETIME not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

        FOREIGN KEY (lecturer_id) REFERENCES ${lecturerTable}(lecturer_id)
    )
`

conn.query(tableEvents, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})