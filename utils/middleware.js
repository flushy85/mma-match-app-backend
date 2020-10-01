const requestLogger = (req, res, next) => {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('---')
    next()
}


const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}


const errorHandler = (err, req, res, next) => {
    console.error(err.name)
  
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    } else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    } else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            error: 'invalid token'
        })
    }

    next(err)
}

module.exports = {
    errorHandler,
    unknownEndpoint,
    requestLogger
}