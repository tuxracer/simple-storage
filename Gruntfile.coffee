module.exports = (grunt) ->
  grunt.initConfig
    browserify:
      dist:
        files:
          'tmp/storage.js': 'src/storage.coffee'
        options:
          transform: ['coffeeify']
          standalone: 'storage'
      test:
        files:
          'test/spec/test.js': 'test/spec/test.coffee'
        options:
          transform: ['coffeeify']
          extensions: [
            '.coffee'
          ]

    uglify:
      dist:
        options:
          report: 'min'
          preserveComments: 'some'
        src: 'tmp/storage.js'
        dest: 'storage.js'

    clean:
      test: ['tmp']

    mocha:
      test:
        src: ['test/index.html']
        options:
          bail: true
          log: true
          reporter: 'Nyan'
          run: true
          timeout: 10000
          mocha:
            ignoreLeaks: false

  # Load installed tasks
  grunt.file.glob
  .sync('./node_modules/grunt-*/tasks')
  .forEach(grunt.loadTasks)

  # Shortcuts
  grunt.registerTask 'test', ['browserify','mocha']
  grunt.registerTask 'b', ['test','uglify','clean']

  # Default task
  grunt.registerTask 'default', 'b'
