'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        filesize: {
            intl: {
                files: [{
                    cwd: 'node_modules/',
                    src: [
                        'intl/*.min.js',
                        'react-intl/dist/*.min.js',
                        'dust-intl/dist/*.min.js',
                        'handlebars-intl/dist/*.min.js',
                        'ember-intl/packaging/dist/*.min.js'
                    ],
                    dest: 'config/sizes.json'
                }]
            }
        },

        clean: {
            build: 'build/',
            tmp: 'tmp/'
        },

        broccoli_build: {
            assets: {
                dest: 'build/'
            }
        },

        casperjs: {
            options: {
                casperjsOptions: [
                    '--host=localhost:5000',
                    '--includes=tests/functional/utils/casper-setup.js'
                ]
            },
            files: ['tests/functional/*.js']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-casperjs');
    grunt.loadTasks('tasks/');

    grunt.registerTask('build', ['clean', 'broccoli_build']);
    grunt.registerTask('functional.tests', ['casperjs']);
    grunt.registerTask('default', ['build']);
};