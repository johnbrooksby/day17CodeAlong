const movies = require("../db.json");
let globalId = 11;

module.exports = {
    getMovies: (req, res) => {
        res.status(200).send(movies);
    },

    deleteMovie: (req, res) => {
        // destructure id from the route params
        const {id} = req.params;
        // loop through the movies array to find the movie with the id
        const idx = movies.findIndex(movie => movie.id === +id);
        if (idx >= 0){
            // splice the movie out of the movies array
            movies.splice(idx, 1);
            // send status 200 with the updates array
            res.status(200).send(movies);
        } else {
            res.sendStatus(404);
        }
    },

    updateMovie: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        const idx = movies.findIndex(movie => movie.id === +id);
        if(type === "plus") {
            if (movies[idx].rating < 5) movies[idx].rating++;
            res.status(200).send(movies);
        } else {
            if (movies[idx].rating > 1) movies[idx].rating--;
            res.status(200).send(movies);
        }
    },

    addMovie: (req, res) => {
        // destructure the body obj
        const { title, rating, imageURL } = req.body;
        // check body to make sure all data exists
        if (!title || !rating || !imageURL){
            res.sendStatus(400);
        }
        // copy body object and add new id
        const copy = {...req.body, id: globalId};
        // push copy to movies array
        movies.push(copy);
        globalId++;
        // send status 200 with updated movies array
        res.status(200).send(movies);
    }
}