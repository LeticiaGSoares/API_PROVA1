
const validateLecturer = (req, res, next) => {
    const {nome, expertise} = req.body

    if(!nome){
        return res.status(400).json({validationError: "O nome é obrigatório"})
    }
    if(!expertise){
        return res.status(400).json({validationError: "A expertise é obrigatória"})
    }

    next()
}

export default validateLecturer