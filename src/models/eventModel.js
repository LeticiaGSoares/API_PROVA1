import conn from '../config/conn.js'
export const tableName = "events"

const tableEvents = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        event_id varchar(60) primary key,
        titulo varchar(255) not null,
        data DATE not null,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
`

conn.query(tableEvents, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})