ShopifyApp.configure do |config|
  config.application_name = 'Jolted'
  config.api_key = ENV.fetch('SHOPIFY_API_KEY')
  config.secret = ENV.fetch('SHOPIFY_SECRET')
  config.old_secret = ''
  
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = 'read_script_tags, write_script_tags, read_price_rules, write_price_rules, read_discounts, write_discounts'

  config.embedded_app = false
  config.after_authenticate_job = false
  config.api_version = '2020-04'
  config.shop_session_repository = 'Shop'

  host_url = Rails.application.config.host_url
  config.webhooks = [
    { topic: 'app/uninstalled', address: "#{host_url}/webhooks/app_uninstalled" }
  ]
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
