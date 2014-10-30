module.exports = function (grunt) {


    var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'release');

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-execute');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Configuration goes here
    grunt.initConfig({



        execute: {




            src: ['Font/convertFont.js']
        },

        uglify: {
            build: {
                options: {
                    mangle: false,
                     compress: {
                        drop_console: productionBuild,
                        drop_debugger: productionBuild
                    }
                },
                files: {
                    'minified/js/game.js': ['dev/js/states/Boot.js','dev/js/**/*.js', '!dev/js/lib/**'],
                    'port/js/game.js': ['dev_port/js/states/Boot.js','dev_port/js/**/*.js', '!dev_port/js/lib/**'],
                    'port_lite/js/game.js': ['dev_port/js/states/Boot.js','dev_port/js/**/*.js', '!dev_port/js/serverComm.js','lite_version_data/serverComm.js','!dev_port/js/lib/**'],
                   
                }
            }
        },

        compress: {
            android: {
                options: {
                    archive: 'port/port.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        src: '**/*',
                        cwd: 'port/',
                        expand: true
                    }
        ]
            },

            ios: {
                options: {
                    archive: 'port_lite/port_lite.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        src: '**/*',
                        cwd: 'port_lite/',
                        expand: true
                    }
        ]
            }
        },


        copy: {

            font: {

                cwd: 'dev/assets/font',
                src: '*.fnt',
                dest: 'Font/',
                rename: function (dest, src) {
                    return dest + src.replace('.fnt', '.xml');
                },
                expand: true


            },




            main: {
                files: [
                    {
                        cwd: 'dev/',
                        src: 'assets/**',
                        dest: 'minified/',
                        expand: true
            },

                    {
                        cwd: 'dev_port',
                        src: 'assets/**',
                        dest: 'port/',
                        expand: true
            },

                    {
                        cwd: 'dev_port',
                        src: 'assets/**',
                        dest: 'port_lite/',
                        expand: true
            },

    {
                        cwd: 'lite_version_data/',
                        src: 'assets/**',
                        dest: 'port_lite/',
                        expand: true
            },



                    {
                        cwd: 'dev/js/lib/',
                        src: 'phaser.min.js',
                        dest: 'minified/js/',
                        expand: true
            },

         

                    {
                        cwd: 'dev/js/',
                        src: 'levels/**',
                        dest: 'minified/js/',
                        expand: true
            },

                    {
                        cwd: 'dev/js/',
                        src: 'levels/**',
                        dest: 'port/js/',
                        expand: true
            },

                    {
                        cwd: 'lite_version_data/',
                        src: 'levels/**',
                        dest: 'port_lite/js/',
                        expand: true
            },

                    {
                        cwd: 'indexFiles/',
                        src: 'indexCocoonJS.html',
                        dest: 'port/',
                        rename: function (dest, src) {
                            return dest + src.replace('indexCocoonJS', 'index');
                        },
                        expand: true
            },


                    {
                        cwd: 'indexFiles/',
                        src: 'indexCocoonJS.html',
                        dest: 'port_lite/',
                        rename: function (dest, src) {
                            return dest + src.replace('indexCocoonJS', 'index');
                        },
                        expand: true
            },

                    {
                        cwd: 'indexFiles/',
                        src: 'indexWeb.html',
                        dest: 'minified/',
                        rename: function (dest, src) {
                            return dest + src.replace('indexWeb', 'index');
                        },
                        expand: true
            },

                    {
                        cwd: 'Font/',
                        src: '*.json',
                        dest: 'port/assets/font',
                        expand: true
            },

                    {
                        cwd: 'Font/',
                        src: '*.json',
                        dest: 'port_lite/assets/font',
                        expand: true
            },





                ]
            }


        },

        clean: ["port/**", "port_lite/**"]





    });


    // Load plugins here

 


    // Define your tasks here
    grunt.registerTask('default', ['clean', 'copy:font', 'execute', 'uglify', 'copy:main', 'compress']);
    grunt.registerTask('release', ['clean', 'copy:font', 'execute', 'uglify', 'copy:main', 'compress']);


};
