var _ = require('lodash');

var options = {
  //banner: '<%= banner %>',
  browserifyOptions: {
    debug: true
  },
  debug: true,
  extension: [ '.js', '.jsx' ],
  transform: [
    [ 'babelify'/*, { 'stage': 2 }*/ ],
    [ require('grunt-react').browserify, { global: true } ]
  ],
};

var optsW = _.extend(_.clone(options), {  watch: true });

module.exports = {
  app: {
    options: options,
    src: ['src/index.js'],
    dest: 'dist/<%= pkg.name %>.js'
  },

  watch: {
    options: optsW,
    src: ['src/index.js'],
    dest: 'dist/<%= pkg.name %>.js'
  }
};