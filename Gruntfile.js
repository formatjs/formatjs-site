module.exports = function (grunt) {
    grunt.initConfig({
        filesize: {
            all: {
                files: [{
                    cwd: 'bower_components/',
                    src: [
                        'intl/intl.min.js',
                        'intl-messageformat/build/*.js',
                        'react-intl/dist/react-intl.min.js'
                    ],
                    dest: 'config/sizes.json'
                }]
            }
        }
    });

    grunt.loadTasks('tasks/');

    grunt.registerTask('build', ['filesize']);
};
