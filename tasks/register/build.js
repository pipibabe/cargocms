module.exports = function (grunt) {
	grunt.registerTask('build', [
		'bower:dev',
		'compileAssets',
		'linkAssetsBuild',
		// 'clean:build',
		'sass:dev',
		'copy:build',
	]);
};
