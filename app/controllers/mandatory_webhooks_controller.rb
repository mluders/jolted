class MandatoryWebhooksController < ActionController::API
  include ShopifyApp::WebhookVerification

  def customer_data_request
    head :no_content
  end

  def customer_data_redact
    head :no_content
  end

  def shop_redact
    head :no_content
  end
end
