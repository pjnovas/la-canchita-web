module.exports = {
  less: {
    files: [ 'src/**/*.less' ],
    tasks: [ 'less' ],
    options: {
      atBegin: true
    }
  },

  app: {
    files: [ 'src/**/*.js' ],
    tasks: [ 'eslint' ],
    options: {
      atBegin: true
    }
  },

  copy: {
    files: [ 'dist/<%= pkg.name %>.css', 'dist/<%= pkg.name %>.js' ],
    tasks: [ 'copy:assets' ],
    options: {
      atBegin: true
    }
  }
};
