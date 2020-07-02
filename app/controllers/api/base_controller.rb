module API
  class BaseController < ActionController::API
    include AuthHelpers
  end
end
