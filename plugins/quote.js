// "use strict";

const fp = require("fastify-plugin");

const quotes = [
  "You are the shuckiest shuck faced shuck in the world!",
  "Her name badge read: Hello! My name is DIE, DEMIGOD SCUM!",
  "A musician must make music, an artist must paint, a poet must write, if he is to be ultimately at peace with himself. What a man can be, he must be",
  "I'm about as intimidating as a butterfly.",
  "Never ask an elf for help; they might decide your better off dead",
];

const randomValue=(param)=>{
    return param[Math.floor(Math.random()*quotes.length)];
}

module.exports = fp(async function (fastify, _opts) {
  fastify.decorate('quote',(_val)=>{
      return randomValue(quotes);
  });
});
