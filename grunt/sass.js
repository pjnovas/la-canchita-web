module.exports = {
  app: {
    options: {
      style: 'expanded'
    },
    files: {
      "dist/<%= pkg.name %>.css": 'src/styles/index.scss'
    }
  }
};
