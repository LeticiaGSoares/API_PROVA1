import conn from '../config/conn.js'
export const tableName = "eventParticipants"

const tableEventParticipants = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        id varchar(60) primary key,
        event_id varchar(60) not null,
        participant_id varchar(60) not null,

        FOREIGN KEY (event_id) REFERENCES events(event_id),
        FOREIGN KEY (participant_id) REFERENCES participants(participant_id)
    )
`

conn.query(tableEventParticipants, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})