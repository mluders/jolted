Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  resource :wheel, only: [:edit, :destroy] do
    get 'preview', as: :preview
  end

  namespace :api do
    resource :wheel, only: [:edit, :update]
  end

  namespace :proxy, path: '/apps/jolted' do
    resources :shops, only: :none do
      get 'snippet.js', to: 'snippets#show', as: :snippet
      resource :frame, only: [:show]
      resource :wheel, only: [:show]
      resources :discount_codes, only: [:create]
    end
  end

  controller :mandatory_webhooks do
    post '/webhooks/shop_redact', action: :shop_redact
    post '/webhooks/customers_redact', action: :customer_redact
    post '/webhooks/customers_data_request', action: :customer_data_request
  end

  get '/privacy', to: 'legal#privacy', as: :privacy
end
