module.exports = (grunt) ->
  grunt.initConfig
    coffee:
      test:
        files:
          'tmp/spec/test.js': 'test/spec/test.coffee'

    browserify:
      dist:
        files:
          'tmp/storage.js': 'src/storage.coffee'
        options:
          transform: ['coffeeify']
          standalone: 'storage'

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
  grunt.registerTask 'test', ['browserify','coffee','mocha']
  grunt.registerTask 'b', ['test','uglify','clean']

  # Default task
  grunt.registerTask 'default', 'b'
