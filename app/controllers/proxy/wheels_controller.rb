module Proxy
  class WheelsController < ApplicationController
    skip_before_action :verify_authenticity_token, only: [:create]

    def create
      email = params.require(:email)
      render json: { prize: 'abc123', segment: 4 }, status: :created
    end
  end
end
