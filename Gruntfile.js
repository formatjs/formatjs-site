'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        filesize: {
            intl: {
                files: [{
                    cwd: 'node_modules/',
                    src: [
                        'intl/*.min.js',
                        'intl-messageformat/dist/*.min.js',
                        'react-intl/dist/*.min.js',
                        'dust-helper-intl/dist/*.min.js',
                        'handlebars-helper-intl/dist/*.min.js'
                    ],
                    dest: 'config/sizes.json'
                }]
            }
        },

        clean: {
            build: 'build/',
            tmp  : 'tmp/'
        },

        broccoli_build: {
            assets: {
                dest: 'build/'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadTasks('tasks/');

    grunt.registerTask('build', ['clean', 'broccoli_build']);
    grunt.registerTask('default', ['build']);
};
