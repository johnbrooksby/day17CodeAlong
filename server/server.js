const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const {getMovies, deleteMovie, updateMovie, addMovie} = require("./controllers/ctrl")

app.get("/api/movies", getMovies);
app.delete("/api/movies/:id", deleteMovie);
app.put("/api/movies/:id", updateMovie);
app.post("/api/movies", addMovie);

const PORT = 4004;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));