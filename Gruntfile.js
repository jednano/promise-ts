module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		clean: ['test/**/*.js'],
		typescript: {
			options: {
				module: 'commonjs',
				target: 'es5',
				dest: ''
			},
			lib: {
				options: {
					declaration: true
				},
				src: 'lib/promise.ts'
			},
			test: {
				src: 'test/**/*.ts'
			}
		},
		mochaTest: {
			test: {
				options: {
					reporter: 'spec',
					clearRequireCache: true
				},
				src: 'test/**/*.js'
			}
		},
		watch: {
			ts: {
				files: '{lib,test}/**/*.ts',
				tasks: ['test']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-mocha-test');
	grunt.loadNpmTasks('grunt-typescript');

	grunt.registerTask('default', ['test', 'watch']);
	grunt.registerTask('test', ['build', 'mochaTest', 'clean']);
	grunt.registerTask('build', ['clean', 'typescript']);

};
