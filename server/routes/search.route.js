import express from 'express';
import { getSearchHistory, removeSearchHistory, searchMovies, searchPerson, searchTv } from '../controller/search.controller.js';

const searchRouter = express.Router()
    searchRouter.get("/person/:query",searchPerson)
    searchRouter.get("/movie/:query",searchMovies)
    searchRouter.get("/tv/:query",searchTv)
    searchRouter.get("/history",getSearchHistory)
    searchRouter.delete("/history/:id",removeSearchHistory)

export default searchRouter 