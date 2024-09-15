import { fetchTmdbApi } from "../services/tmdb.service.js";
import { user } from "../schema/user.schema.js";

export const searchPerson = async(req, res) => {
    const { query } =  req.params;
    try {
        const response = await fetchTmdbApi(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(404).json({ message: "Person not found" })
        }
        await user.findByIdAndUpdate(req.user._id,{
            $push: { searchHistory:{
                id: response.results[0].id,
                image:response.results[0].profile_path,
                title: response.results[0].name,
                searchType:"person",
                createdAt:new Date()
            } }
        })        
         res.status(200).json({message: true, content: response.results})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching person" })
    }
}
export const searchMovies = async(req, res) => {
    const { query } =  req.params;
    try {
        const response = await fetchTmdbApi(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(404).json({ message: "Person not found" })
        }
        await user.findByIdAndUpdate(req.user._id,{
            $push: { searchHistory:{
                id: response.results[0].id,
                image:response.results[0].profile_path,
                title: response.results[0].name,
                searchType:"movie",
                createdAt:new Date()
            } }
        })        
         res.status(200).json({message: true, content: response.results})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching person" })
    }
}
export const searchTv = async(req, res) => {
    const { query } =  req.params;
    try {
        const response = await fetchTmdbApi(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`)
        if(response.results.length === 0){
            return res.status(404).json({ message: "Person not found" })
        }
        await user.findByIdAndUpdate(req.user._id,{
            $push: { searchHistory:{
                id: response.results[0].id,
                image:response.results[0].profile_path,
                title: response.results[0].name,
                searchType:"tv",
                createdAt:new Date()
            } }
        })        
         res.status(200).json({message: true, content: response.results})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error searching person" })
    }
}
export const getSearchHistory = async() => {
    try {
        res.status(200).json({success: true, content:req.user.searchHistory})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting search history" })
    }
}
export const removeSearchHistory = async(req,res) => {
    let { id } = req.params
    id = parseInt(id);
    try {
        await user.findByIdAndUpdate(req.user._id,{
            $pull: { searchHistory: { id: id } }
        })
        res.status(200).json({success:true, message:"item removed from search history"})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error removing search history" })
    }
}