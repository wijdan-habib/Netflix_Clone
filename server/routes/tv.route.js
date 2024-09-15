import express from 'express'
import { GetSimilarsTv, getTrendingTv, GetTvByCategories, GetTvDetails, GetTvTrailers } from '../controller/tv.controller.js';
const tvRouter = express.Router()

tvRouter.get("/trending",getTrendingTv);
tvRouter.get("/:id/trailers",GetTvTrailers);
tvRouter.get("/:id/details",GetTvDetails);
tvRouter.get("/:id/similars",GetSimilarsTv);
tvRouter.get("/:categories",GetTvByCategories);


export default tvRouter