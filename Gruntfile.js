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
                        'dust-intl/dist/*.min.js',
                        'handlebars-intl/dist/*.min.js'
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
        },

        run: {
            test_server: {
                options: {
                    wait: false
                },
                args: [
                    'server.js'
                ]
            }
        },

        mocha_istanbul: {
            unit_tests: {
                src: 'tests/unit/'
            }
        },

        simplemocha: {
            functional_tests: {
                options: {
                    timeout: 2 * 60 * 1000,
                    bail: true
                },
                src: 'tests/functional/*.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-run');
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-simple-mocha');
    grunt.loadTasks('tasks/');

    grunt.registerTask('test', [
        'mocha_istanbul:unit_tests',
        'run:test_server',
        'simplemocha:functional_tests',
        'stop:test_server'
    ]);

    grunt.registerTask('build', ['clean', 'broccoli_build']);
    grunt.registerTask('default', ['build']);
};
