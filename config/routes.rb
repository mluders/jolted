Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  resource :wheel

  namespace :proxy do
    resource :snippet, only: [:show]
    resource :frame, only: [:show]
    resources :wheels, only: [:show]
    resources :discount_codes, only: [:create]
  end
end
