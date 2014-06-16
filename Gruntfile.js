module.exports = function (grunt) {
    grunt.initConfig({
    	clean: {
			hooks: ['.git/hooks/pre-commit']
		},

		shell: {
		  	hooks: {
		    	command: 'cp git-hooks/pre-commit .git/hooks/'
		  	}
		}

    })

    grunt.loadNpmTasks('grunt-contrib-clean')
	grunt.loadNpmTasks('grunt-shell')
	
    grunt.task.registerTask('hookmeup', ['clean:hooks', 'shell:hooks'])
}