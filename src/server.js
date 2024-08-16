//importação de dependencias
import "dotenv/config";
import express from "express"

//variáveis para a aplicação
const PORT = process.env.PORT;
const app = express();

//importar rotas
import eventRoutes from './routes/eventRoutes.js'
import lecturerRoutes from './routes/lecturerRoutes.js'
import participantRoutes from './routes/participantRoutes.js'


import './models/participantModel.js'
import './models/lecturerModel.js'
import './models/eventModel.js'
import './models/eventLecturersModel.js'
import './models/eventFeedbacksModel.js'
import './models/eventParticipantsModel.js'

app.use(express.urlencoded({extended: true}))
app.use(express.json())

//padroniza rotas
app.use("/eventos", eventRoutes)
app.use("/eventos/palestrantes", lecturerRoutes)
app.use("/eventos", participantRoutes)

app.use("*", (req, res)=> {
    res.status(404).send({message: "Rota não encontrada"})
})

//começar servidor
app.listen(PORT, ()=>{
    console.log("Server on http://localhost:" + PORT)
})