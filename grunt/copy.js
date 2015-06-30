module.exports = {
  assets: {
    files: [
      {
        expand: true,
        cwd: 'dist/',
        src: ['**/*.js'],
        dest: '../la-canchita/assets/js/',
        rename: function(dest, src) {
          return dest + src;
        }
      },
      {
        expand: true,
        cwd: 'dist/',
        src: ['**/*.css'],
        dest: '../la-canchita/assets/styles/',
        rename: function(dest, src) {
          return dest + src;
        }
      }
    ]
  }
};