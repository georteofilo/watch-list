const db = require("../Config/database");

const registerWatchList = async (req, res) => {
  const { name, description } = req.body;
  const { user } = req;

  try {
    const watchList = {
      name,
      description,
      user_id: user.id,
    };
    const response = await db("watchlists").insert(watchList).returning("id");

    console.log(response);

    const data = {
      id: response[0].id,
      name,
      description,
      user: user.name,
    };
    return res.status(201).json(data);
  } catch (error) {
    console.log(error.message);
    return res.status(500);
  }
};

module.exports = {
  registerWatchList,
};
