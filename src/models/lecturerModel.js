import conn from '../config/conn.js'

export const tableName = "lecturers"

const tableLecturers = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        lecturer_id varchar(60) primary key,
        nome varchar(255) not null,
        expertise varchar(50) not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableLecturers, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})