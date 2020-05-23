# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::Authenticated

  def current_shop
    Shop.find(session[:shop_id])
  end
end
