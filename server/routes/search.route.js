import express from 'express';

const searchRouter = express.Router()
    searchRouter.get("/person/:query",searchPerson)
    searchRouter.get("/movie/:query",searchMovie)
    searchRouter.get("/tv/:query",searchTv)
export default searchRouter 