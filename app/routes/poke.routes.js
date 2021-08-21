module.exports = app => {
    const poke = require("../controllers/poke.controller.js");

    var router = require("express").Router();

    // Retrieve all poke
    router.get("/", poke.getall);

    //Retrieve My Pokemon
    router.get("/my-pokemon",  poke.listpokemon);
    
    // Retrieve a single poke with id
    router.get("/:id",  poke.getdetail);
    
    // Add a pokemon
    router.post("/",  poke.addpokemon);

    // Delete a poke with id
    router.delete("/:id",  poke.remove);


    app.use('/api/pokemon', router);
};