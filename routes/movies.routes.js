const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get('/create', (req, res, next) => {
    Celebrity.find()
    .then((dbCelebs) => {
        res.render('movies/new-movie', {dbCelebs})
    })
})

router.post('/create', (req, res, next) => {
    Movie.create(req.body)
    .then(result => {
        console.log("result: ", result)
        res.redirect('/movies/movies')
    })
    .catch(err => {
        res.render("movies/new-movie")
    })
})

router.get('/movies', (req, res, next) => {
    Movie.find()
    .then(resul => {
        const data = {}
        if (resul.length > 0) data.mov = resul
        res.render('movies/movies', data)
    })
})

router.get("/:idPeli", (req, res, next)=>{
    console.log("req.params: ",req.params.idPeli)
    Movie.findById(req.params.idPeli)
    .populate('cast')
    .then(result => {
        const data = {}
        console.log("result: ", result)
        data.movi = result
        res.render('movies/movie-details', data)
    })
    .catch(err => {
        console.log("error més: ", err)
    })
  })

router.post("/:idPeli/delete", (req, res, next) => {
    Movie.findByIdAndDelete(req.params.idPeli)
    .then(result => {
        console.log("result: ", result)
        res.redirect('/movies/movies')
    })
    .catch(err => {
        console.log("err borrar: ", err)
    })
})

router.get("/:idPeli/edit", (req, res, next) => {
    Movie.findById(req.params.idPeli)
    .populate("cast")
    .then(result => {
        const data = {
            idPeli: result._id,
            title: result.title,
            genre: result.genre,
            plot: result.plot,
            cast: result.cast,
        }
        console.log("edit cast: ", result)
        res.render('movies/edit-movie', data)
    })
    .catch(err => {
        console.log("err borrar: ", err)
    })
})

router.post("/:idPeli/edit", (req, res, next) => {
    console.log("edit req.body: ", req.body)
    console.log("edit req.params.idPeli: ", req.params.idPeli)
    const filter = { _id: req.params.idPeli }
    console.log("filter: ", filter)
    Movie.findOneAndUpdate(filter, req.body)
    .then(result => {
        console.log("result edit: ", result)
        res.redirect("/movies/movies");
    })
})

module.exports = router;