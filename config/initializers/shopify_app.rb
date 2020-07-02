Rails.application.config.shopify = { api_version: '2020-04' }

ShopifyApp.configure do |config|
  config.application_name = 'HowdyFox'
  config.api_key = Rails.application.credentials.shopify[:api_key]
  config.secret = Rails.application.credentials.shopify[:api_secret]
  config.old_secret = ''
  
  # https://help.shopify.com/en/api/getting-started/authentication/oauth/scopes
  config.scope = 'read_script_tags, write_script_tags, read_price_rules, write_price_rules, read_discounts, write_discounts'

  config.embedded_app = false
  config.after_authenticate_job = false
  config.api_version = Rails.application.config.shopify[:api_version]
  config.shop_session_repository = 'Shop'
end

# ShopifyApp::Utils.fetch_known_api_versions                        # Uncomment to fetch known api versions from shopify servers on boot
# ShopifyAPI::ApiVersion.version_lookup_mode = :raise_on_unknown    # Uncomment to raise an error if attempting to use an api version that was not previously known
