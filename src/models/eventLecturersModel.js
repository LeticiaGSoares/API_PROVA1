import conn from '../config/conn.js'
export const tableName = "eventLecturers"

const tableEventsLecturer = /*sql*/`
    CREATE TABLE IF NOT EXISTS ${tableName}(
        id varchar(60) primary key,
        event_id varchar(60) not null,
        lecturer_id varchar(60) not null,

        FOREIGN KEY (event_id) REFERENCES events(event_id),
        FOREIGN KEY (lecturer_id) REFERENCES lecturers(lecturer_id)
    )
`

conn.query(tableEventsLecturer, (err)=> {
    if(err){
        console.error(err)
        return
    }

    console.log(`[${tableName}] table created`)
})