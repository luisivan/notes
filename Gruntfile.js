/* jshint node:true */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    clean: {
      hooks: ['.git/hooks/pre-commit']
    },

    shell: {
      hooks: {
        command: 'cp git-hooks/pre-commit .git/hooks/'
      }
    },

    jshint: {
      all: ['Gruntfile.js', 'app/js/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.task.registerTask('hookmeup', ['clean:hooks', 'shell:hooks']);
  grunt.task.registerTask('linter', ['jshint']);
};
