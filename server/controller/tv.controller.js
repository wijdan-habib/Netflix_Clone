import { fetchTmdbApi } from "../services/tmdb.service.js"; 

export const getTrendingTv = async (req, res) => {
  try {
    // Call the service to fetch the movie data
    const data = await fetchTmdbApi('https://api.themoviedb.org/3/tv/popular?language=en-US&page=1');
    
    // Check if data or results are empty
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No movies found" });
    }

    // Select a random movie from the results
    const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
    
    // Return the random movie in the response
    res.json({ success: true, content: randomMovie });
    
  } catch (error) {
    // Log and handle any errors
    res.status(500).json({ success: false, message: error.message });
  }
};

export const GetTvTrailers = async function (req, res) {
  const { id } = req.params;  // Extract movie ID from request params

  try {
    // Correct the URL to fetch movie trailers
    const data = await fetchTmdbApi(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);

    // Check if there are any trailers in the results
    if (!data || !data.results || data.results.length === 0) {
      return res.status(404).json({ success: false, message: "No trailers found" });
    }

    // Send the trailers data in the response
    res.json({ success: true, trailers: data.results });

  } catch (error) {
    // Handle 404 error if the movie is not found
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    // Log and return any other server errors
    res.status(500).json({ success: false, message: error.message });
  }
};

export const GetTvDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchTmdbApi(`https://api.themoviedb.org/3/tv/${id}?language=en-US`)
    res.status(200).json({success:true, content: data})
  } catch (error) {
    if (error.message.includes("404")) {
      return res.status(404).send(null);
    }

    // Log and return any other server errors
    res.status(500).json({ success: false, message: error.message });
  }
  }

  export const GetSimilarsTv = async (req, res) => {
    const { id } = req.params;
      try {
        const data = await fetchTmdbApi(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`)
        res.status(200).json({success:true, content: data.results})
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
  }

export const GetTvByCategories = async (req, res) => {
  const { categories } = req.params;
  try {
    const data = await fetchTmdbApi(`https://api.themoviedb.org/3/tv/${categories}?language=en-US&page=1`);
    
    if (!data || !data.results) {
      return res.status(404).json({ success: false, message: "No movies found" });
    }

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
