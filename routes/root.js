// 'use strict'

module.exports = async function (fastify, opts) {
  const q=fastify.quote();
  fastify.get('/api/quote', async function (_req, res) {
    res.send(q);
  })
}
