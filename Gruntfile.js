const { options } = require("less");

module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less:{
            development: {
            files:{
                'dev/styles/main.css': 'src/styles/main.less',
            }
            },
            production: {
                options:{
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less'
                }
            }
        },
        watch:{
            less:{
                files:['src/styles/**/*.less'],
                tasks: ['less:development', 'copy:dev_js', 'copy:dev_img']
            },
            html:{
                files: ['src/index.html'],
                tasks: ['less:development', 'replace:dev']
            }
        },
        replace:{
            dev:{
                options:{
                    patterns:[
                        {
                            match: 'ENDERECO_DO_css',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand:true,
                        flatten: true,
                        src:['src/index.html'],
                        dest: 'dev/'
                    },
                ]
            },
            dist:{
                options:{
                    patterns:[
                        {
                            match: 'ENDERECO_DO_css',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files:[
                    {
                        expand: true,
                        flatten: true,
                        src:['prebuild/index.html'],
                        dest: 'dist/',
                    }
                ]
            }
        },
        htmlmin:{
            dist:{
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files:{
                    'prebuild/index.html': 'src/index.html',
                }
            }
        },
        clean: ['prebuild'],
        uglify:{
            target:{
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        },
        copy: {
            dev_js:{
                expand: true,
                cwd: 'src/scripts/',
                src: 'main.js',
                dest: 'dev/scripts/',
            },
            dev_img: {
                expand: true,
                cwd: 'src/images/',
                src: '**/*',
                dest: 'dev/images/'
            },
            prod_img: {
                expand: true,
                cwd: 'src/images/',
                src: '**/*',
                dest: 'dist/images/'            }
        }
})

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'htmlmin:dist', 'replace:dist', 'uglify', 'copy:prod_img' ,'clean']);

}