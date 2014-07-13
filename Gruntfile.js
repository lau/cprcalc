module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    qunit: {
      all: ['test/*.html']
    },
    watch: {
      files: ['test/*.js', 'test/*.html', '*.js'],
      tasks: ['qunit']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['qunit']);
};
