module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        distdir : '../server/app/assets/app',
        sass: {
            options: {
                sourceMap: true
            },
            dist: {
                files: [
                    {src: 'app/assets/css/app.scss', dest: 'app/assets/css/app.css'},
                ],
            }
        },
        watch: {
            scripts: {
                files: ['**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                    livereload: true,
                },
            },
        },
/*        'http-server': {
            'dev': {
                root: "app",
                port: 8000,
                host: "getinvolved.org.il",
                showDir: true,
                autoIndex: true,
                ext: "html",
                openBrowser: true
            }
        },*/
        shell: {
            startApiServer: {
                command: 'python -m org.gi.server.server --mode dev',
                options: {
                    execOptions: {
                        cwd: '../../server'
                    }
                }
            }
        },
        concurrent: {
            all: ['http-server:dev', 'shell:startApiServer', 'watch'],
            withoutApi: ['http-server:dev', 'watch'],
            options: {
                logConcurrentOutput: true
            }
        },
        copy: {
            all: {
                files: [
                    { dest: '<%= distdir %>', src: ['**'], expand: true, cwd: 'app' },
/*                    { dest: '<%= distdir %>/css', src: '**', expand: true, cwd: 'src/css/' },
                    { dest: '<%= distdir %>/font', src: '**', expand: true, cwd: 'src/font/' },
                    { dest: '<%= distdir %>/widgetIframe', src: '**', expand: true, cwd: 'src/common/widgetIframe/' }*/
                ]
            }
        },
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: '"use strict";\n\n {%= __ngModule %}',
                name: 'config',
            },
            // Environment targets
            development: {
                options: {
                    dest: 'app/config.js'
                },
                constants: {
                    ENV: {
                        name: 'dev',
                        apiEndpoint: 'http://localhost:1337'
                    }
                }
            },
            production: {
                options: {
                    dest: '<%= distdir %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndpoint: 'http://e-part-hw-app.herokuapp.com'
                    }
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['sass', 'concurrent:withoutApi']);
    grunt.registerTask('with-server', ['sass', 'concurrent:all']);
    grunt.registerTask('release', ['sass','copy:all', 'ngconstant:production']);

};
