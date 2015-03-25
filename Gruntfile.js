'use strict';

module.exports = function (grunt) {
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
                    dest: 'config/lib-sizes.json'
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

        casper: {
            functional: {
                files: {
                    'artifacts/test/functional/results.xml': ['tests/functional/*.js']
                },
                options: {
                    test: true,
                    includes: 'tests/functional/utils/casper-setup.js',
                    host: grunt.option('host') || 'localhost:5000'
                }
            }
        },

        shell: {
            health_check: {
                command: 'mkdir -p artifacts/test/health-check &&' +
                    ' ./node_modules/.bin/mocha --reporter tap tests/health-check.js --host=' + (grunt.option('host') || 'localhost:5000') +
                        ' | tee artifacts/test/health-check/results.tap'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-broccoli-build');
    grunt.loadNpmTasks('grunt-casper');
    grunt.loadNpmTasks('grunt-shell-spawn');
    grunt.loadTasks('tasks/');

    grunt.registerTask('build', ['clean', 'broccoli_build']);

    grunt.registerTask('functional.tests', ['casper:functional']);
    grunt.registerTask('health.check', ['shell:health_check']);

    grunt.registerTask('default', ['build']);
};
