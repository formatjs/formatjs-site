module.exports = function (grunt) {

    var libpath = require('path');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            all: ['index.js', 'lib/*.js', 'tests/*.js']
        },
        copy: {
            lib: {
                files: [{
                    expand: true,
                    cwd: 'lib/',
                    src: ['*.js'],
                    dest: 'dist/',
                    filter: 'isFile'
                }]
            }
        },
        uglify: {
            options: {
                preserveComments: 'some'
            },
            helpers: {
                src: 'dist/helpers.js',
                dest: 'dist/helpers.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('build', ['copy', 'uglify:helpers']);
    grunt.registerTask('default', ['jshint']);
};
