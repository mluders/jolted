module Proxy
  class SnippetsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:show]

    def show; end
  end
end
