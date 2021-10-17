// 'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const mongoose = require('mongoose');
const notesController=require('./Controllers/NoteController');

const uri = "";
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true });


module.exports = async function (fastify, opts) {
  // Place here your custom code!
  fastify.register((fastify, options, done) => {
    fastify.register(require("fastify-cors"), {
      origin: "*",
    });
    fastify.route({
      method: "POST",
      url: "/notes/api/notes",
      handler: notesController.addNewNote
    });
    fastify.route({
      method: "GET",
      url: "/notes/api/notes",
      handler: notesController.getAllNotes
    });
    fastify.route({
      method: "GET",
      url: "/notes/api/notes/:id",
      handler: notesController.sendId
    });
    fastify.route({
      method: "PUT",
      url: "/notes/api/notes/:id",
      handler: notesController.updateNote
    });
    fastify.route({
      method: "DELETE",
      url: "/notes/api/notes/:id",
      handler: notesController.deletePost
    });
    fastify.route({
      method:"PUT",
      url:"/employee/api/notes/:id/:tid",
      handler:notesController.addEmployee
    });
    fastify.route({
      method:"GET",
      url:"/employeelogin/api/notes",
      handler:notesController.employeeLogin
    })
    done();
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
