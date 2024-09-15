import express from 'express'
import { GetMovieDetails, GetMoviesByCategories, GetMovieTrailers, GetSimilarsMovies, getTrendingMovie } from '../controller/movie.controller.js';

const movieRouter = express.Router();

movieRouter.get("/trending",getTrendingMovie);
movieRouter.get("/:id/trailers",GetMovieTrailers);
movieRouter.get("/:id/details",GetMovieDetails);
movieRouter.get("/:id/similars",GetSimilarsMovies);
movieRouter.get("/:categories",GetMoviesByCategories);

export default movieRouter;