const Celebrity = require("../models/Celebrity.model");

const router = require("express").Router();

router.get("/create", (req, res, next) => {
    res.render("celebrities/new-celebrity")
})

router.post("/create", (req, res, next) => {
    Celebrity.create(req.body)
    .then(result => {
        console.log("result: ", result)
        res.redirect('/celebrities/celebrities')
    })
    .catch(err => {
        res.render("celebrities/new-celebrity")
    })
})

router.get('/celebrities', (req, res, next) => {
    Celebrity.find()
    .then(result => {
        const data = {};
        if(result.length > 0) data.celebs = result
        res.render("celebrities/celebrities", data)
    })
    .catch(err => {
        console.log("celebs error: ", err)
    })
})

module.exports = router;