const instance = require("../Config/axios");
const omdb_api_key = process.env.OMDB_API_KEY;

const getMovie = async (req, res) => {
  const { name } = req.body;

  const title = name.replace(" ", "+").trim();

  try {
    const { data } = await instance.get(
      `?apikey=${omdb_api_key}&t=${title}&plot=full`
    );

    const movie = {
      title: data.Title,
      year: data.Year,
      runtime: data.Runtime,
      genre: data.Genre,
      director: data.Director,
      actors: data.Actors,
      poster: data.Poster,
      imdbID: data.imdbID,
      plot: data.Plot,
    };

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

module.exports = {
  getMovie,
};
