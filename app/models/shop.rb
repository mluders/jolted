# frozen_string_literal: true
class Shop < ActiveRecord::Base
  include ShopifyApp::ShopSessionStorage

  has_many :wheels, dependent: :destroy

  # TODO: Is this necessary? I don't remember adding this
  def api_version
    ShopifyApp.configuration.api_version
  end
end
