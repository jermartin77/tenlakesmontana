module.exports = function(grunt) {

  // use "just-in-time" plugin loader to load npm tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),
    
    
    concat : {
      options : {
        separator : ';'
      },
      core : {

        src : [

          // Start with Modernizr
          'js/vendor/modernizr-custom.js',
          'bower_components/bootstrap/js/modal.js',
          'bower_components/interact/dist/interact.js',
          'bower_components/scrolltoid/scrolltoid.js',
          'bower_components/modal-extras/js/modal-extras.js',
          'bower_components/waypoints/lib/jquery.waypoints.js',
          'js/griderly.js',
          'js/script.js'
          ],
        // Moved this to an external work location so that someone doesn't work on this file.
        dest : '../js/script.js'
      }
      
      
    },
    
    uglify : { 
      options : {
        banner : '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      // static_mappings : {
      //   // Because these src-dest file mappings are manually specified, every
      //   // time a new file is added or removed, the Gruntfile has to be updated.
      //   files : [
      //     {
      //       src : '../js/script.js',
      //       dest : '../js/core.min.js'
      //     }
      //     , {
      //       src : '../js/checkout.js',
      //       dest : '../js/checkout.min.js'
      //     }
      //     /*, {
      //       src : '../js/product.js',
      //       dest : '../js/product.min.js'
      //     }*/
      //   ]
      // },
      dynamic_mappings : {
        files : [{
          expand : true,            // Enable dynamic expansion.
          cwd : '../js',               // Src matches are relative to this path.
          src : ['*.js'],           // Actual pattern(s) to match.
          dest : '../js',  // Destination path prefix.
          ext : '.min.js'           // Dest filepaths will have this extension.
        }]
      } 
    },
    less : {
      development : {
        options : {
          paths : ["less","../less"],
          compress : false,
          sourceMap: true,
          sourceMapFileInline: true
        },
        files : [{
          expand : true,            // Enable dynamic expansion.
          cwd : 'less',             // Src matches are relative to this path.
          src : ['style.less'],         // Actual pattern(s) to match.
          dest : '../css', // Destination path prefix.
          ext : '.css'              // Dest filepaths will have this extension.
        }]
      },
      production : {
        options : {
          paths : ["less","../less"],
          compress : true,
          sourceMap: false
        },
        files : [{
          expand : true,            // Enable dynamic expansion.
          cwd : 'less',             // Src matches are relative to this path.
          src : ['*.less'],         // Actual pattern(s) to match.
          dest : '../css', // Destination path prefix.
          ext : '.css'              // Dest filepaths will have this extension.
        }]
      }
    },
    jshint : {
      files : ['js/*.js'],
      options : {
        // options here to override JSHint defaults
        globals : {
          jQuery : true,
          console : true,
          module : true,
          document : true
        }
      }
    },
    postcss: {
      options: {
        map: true, // inline sourcemaps

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: '> 1%'}) // add vendor prefixes
          ]
        },
        multiple_files: {
          expand: true,
          flatten: true,
        src: '../css/*.css', // -> src/css/file1.css, src/css/file2.css 
        dest: '../css/' // -> dest/css/file1.css, dest/css/file2.css 
      }
    },


    // If any of these files change, touch off another build.
    watch : {           
      "set1js" : {
        files : ['js/**/*.js'],
        tasks : ['newer:concat'],
        options : {
          livereload : true
        }
      },
      "set2less" : {
        files : ['less/*.less', 'less/**/*.less'],
        tasks : ['less:development', 'postcss'],
        options : {
          livereload : true
        }
      }
      ,
      "set2html" : {
        files : ['../index.html'],
        //tasks : ['less:development', 'postcss'],
        options : {
          livereload : true
        }
      }
    }    
  });

  // NOTE: grunt.loadNpmTasks() not needed since we are using a JIT (just-in-time) loader for grunt plugins
  //grunt.loadNpmTasks('grunt-svgmin');

  // special build options   
  grunt.option('force', true);  // Don't fail on JShint warnings for now.

  // build tasks that build to production will use (runs all minification, uglifications, etc.) 

  grunt.registerTask('default', ['less:development', 'postcss', 'concat',  'watch']);
  grunt.registerTask('deploy', ['bower', 'less:production', 'postcss', 'concat', 'uglify']);

};