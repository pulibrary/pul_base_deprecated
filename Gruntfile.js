module.exports = function (grunt) {

  "use strict";

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

      cssc: {
        build: {
          options: {
            consolidateViaDeclarations: true,
            consolidateViaSelectors:    true,
            consolidateMediaQueries:    true
          },
          files: {
            'snippets/pul-base.libguides.css': 'css/pul-base.libguides.css'
          }
        }
      },

      cssmin: {
        build: {
          src: 'snippets/pul-base.libguides.css',
          dest: 'snippets/pul-base.libguides.min.css'
        }
      },

      compass: {
        options: {
          config: 'config.rb',
          bundleExec: true,
          force: true,
          debugInfo: false,
          quiet: true
        },
        build: {
          options: {
            environment: 'production',
            sassDir: 'sass',
            cssDir: 'css'
          }
        }
      },

      jshint: {
        options: {
          jshintrc: '.jshintrc'
        },
        all: ['js/{,**/}*.js', '!js/{,**/}*.min.js']
      },

      watch: {
        css: {
          files: '**/*.scss',
          tasks: ['compass'],
          options: {
            livereload: true
          }
        }
      },

      shell: {
        all: {
          command: 'drush cache-clear theme-registry'
        }
      }

  });

  grunt.registerTask('default',   ['']);
  grunt.registerTask('build', ['compass', 'shell']);
  grunt.registerTask('tigerstyle',  ['cssc', 'cssmin']);

};
