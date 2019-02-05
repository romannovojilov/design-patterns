module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dest: {
                src: ['app/app.js', 'app/**/*.js'],
                dest: 'dest/app.js'
            }
        },
        uglify: {
            options: {
                stripBanners: true,
                banner: '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            build: {
                src: 'dest/app.js',
                dest: 'dest/app.min.js'
            }
        },
        watch: {
            scripts: {
                files: ['app/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify']);
};