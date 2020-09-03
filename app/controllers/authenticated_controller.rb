# frozen_string_literal: true

class AuthenticatedController < ApplicationController
  include ShopifyApp::Authenticated
  include AuthHelpers
  include BillingHelpers
end
