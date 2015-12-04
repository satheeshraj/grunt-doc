module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     ngmin:{
            commonController:{
                cwd:'scripts/common/',
                expand:true,
                src:['controllers/**/*.js'],
                dest:'build/commonController'
            },
            productController:{
                cwd:'scripts/product/',
                expand:true,
                src:['controllers/**/*.js','directives/**/*.js','!filters/**/*.js','services/**/*.js'],
                dest:'build/productController'
            },
            appJs:{
                cwd:'scripts/',
                expand:true,
                src:['app.js'],
                dest:'build'
            }           
        },                        
        cssmin:{
            minify:{
                files:[{
                    expand:true,
                    cwd:'styles/',
                    src:['catalog.css','common.css','main.css','multiple-select.css','ngplacesmap.css'],
                    dest:'build/dist',
                    ext:'.min.css'
                }]
            }
        },
        uglify:{
            build:{
                files: {
                    'build/dist/common-<%=pkg.version%>.min.js': ['build/commonController/**/*.js'],
                    'build/dist/product-<%=pkg.version%>.min.js': ['build/productController/**/*.js'],                                       
                    'build/dist/app-<%=pkg.version%>.min.js': ['build/app.js']
                }
            }
        },
        clean:['build/commonController','build/productController','build/app.js']
    });
    grunt.registerTask('build',['ngmin','uglify','cssmin']);
    grunt.registerTask('default', ['build','clean']);

};