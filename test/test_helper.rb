ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Load exemplars
  Dir[File.expand_path "test/exemplars/**/*.rb"].each{ |f| require_relative(f) }
end
