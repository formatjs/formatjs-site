module.exports = function (grunt) {
    grunt.initConfig({
        filesize: {
            all: {
                files: [{
                    cwd: 'bower_components/',
                    src: [
                        'intl/*.min.js',
                        'intl-messageformat/build/*.complete.min.js',
                        'react-intl/dist/*.min.js',
                        'dust-helper-intl/dist/*.min.js',
                        'handlebars-helper-intl/dist/*.min.js'
                    ],
                    dest: 'config/sizes.json'
                }]
            }
        }
    });

    grunt.loadTasks('tasks/');

    grunt.registerTask('build', ['filesize']);
    grunt.registerTask('default', ['build']);
};
