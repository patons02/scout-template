module.exports = function (grunt) {
	var devServerPort = 8000;

	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		concat: {
			options: {
				separator: ';'	
			},
			dist: {
				src: ['app/src/**/*.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},

		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},

		jshint: {
			files: ['Gruntfile.js', 'app/src/**/*.js', 'app/test/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},

		express: {
			all: {
				options: {
					port: devServerPort,
					hostname: '0.0.0.0',
					bases: ["app/src"],
					livereload: true
				}
			}
		},

		watch: {
			all: {
				files: 'index.html',
				options: {
					livereload: true
				}
			}
		},

		open: {
			all: {
				path: 'http://localhost:' + devServerPort,
				app: 'chrome'
			}
		}
	});

	grunt.registerTask('default', [
		'jshint',
		'concat',
		'uglify'
	]);

	grunt.registerTask('serve', [
		'express',
		'open',
		'watch'
	]);
};