module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    less: {
      all:{
        files: {
          'dist/static/style.css':'public/less/*.less',
          'dist/static/vendor.css':'bower_components/bootstrap/less/bootstrap.less'
        }
      },
      options: {
        strictImport: true//,
        // sourceMap: true
      }
    },
    clean: ['/dist'],
    copy: {
      all: {
        cwd: 'public/',
        src: ['html/**/*.html'],
        dest: 'dist/',
        flatten: true,
        expand: true
      }
    },
    browserify: {
      all: {
        src: ['./public/js/**/*.jsx','./public/js/**/*.js'],
        dest: 'dist/static/app.js'
      },
      options: {
        debug: true,
        transform: ['reactify', 'debowerify']
      }
    },
    watch: {
      js: {
        files: ['public/js/**/*.js'],
        tasks: ['browserify']
      },
      server: {
        files: ['server/**/*.js'],
        tasks: ['default']
      },
      css: {
        files: ['public/less/**/*.less'],
        tasks: ['less']
      },
      html: {
        files: ['public/html/**/*.html'],
        tasks: ['copy']
      },
      grunt: {
        files: 'Gruntfile.js',
        tasks: 'default'
      },
      options: {
        spawn: false
      }
    },
    express: {
      dev:{
        options: {
          script: 'server/server.js',
          node_env: 'development',
          livereload: true
        }
      }
    }
  });

  grunt.registerTask('build', ['clean','copy','less', 'browserify', 'express:dev','watch']);
  grunt.registerTask('default', ['build']);

};
