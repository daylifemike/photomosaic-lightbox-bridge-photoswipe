module.exports = function(grunt) {

    var plugin_name = 'photomosaic-lightbox-bridge-photoswipe';
    var plugin_path = '../wordpress/wp-content/plugins/' + plugin_name + '/';
    var files = [
        'photomosaic-lightbox-bridge-photoswipe.php',
        'photomosaic-lightbox-bridge-photoswipe.js'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean : {
            plugin : {
                src : plugin_path + '/**/*',
                options : {
                    force : true
                }
            }
        },
        copy : {
            plugin : {
                nonull: true,
                expand : true,
                src : files,
                dest : plugin_path
            }
        },
        watch : {
            files : files,
            tasks : [ 'default' ]
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', [ 'clean:plugin', 'copy:plugin' ]);
};