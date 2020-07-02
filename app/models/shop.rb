# frozen_string_literal: true
class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorage

  has_many :wheels, dependent: :destroy

  def api_version
    ShopifyApp.configuration.api_version
  end
end
