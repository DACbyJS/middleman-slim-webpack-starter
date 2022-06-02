# use slim
require 'slim'

# Directory Indexes for Middleman
activate :directory_indexes

# Speed up the dev
activate :livereload

# allows use of these files With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Webpack Pipeline
activate :external_pipeline,
   name: :webpack,
   command: build? ? 'npm run build' : 'npm run start',
   source: '.tmp/dist',
   latency: 1

# Change our primary js/css directory for webpack/middleman combo
config[:js_dir] = 'assets/scripts'
config[:css_dir] = 'assets/styles'

# helpers
helpers do
   def inline_svg(name)
      root = Middleman::Application.root
      file_path = "#{root}/source/images/#{name}.svg"
      return File.read(file_path) if File.exists?(file_path)
      '(not found)'
    end
end