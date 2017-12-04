module.exports = {
  server: {
    port: 3000
  },
  app: {
    title: 'Example app'
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT,
    dataset: process.env.SANITY_DATASET
  }
}
