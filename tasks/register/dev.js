module.exports = function (grunt) {
	grunt.registerTask('dev', [
		'bower:dev',
		'compileAssets',
		'linkAssetsBuild',
		// 'clean:build',
		'sass:dev',
		'copy:build',
		'watch:assets'
	]);
};
