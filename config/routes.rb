Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  resource :wheel

  namespace :proxy do
    resource :wheel, only: [:create]
    resource :snippet, only: [:show]
    resource :frame, only: [:show]
  end
end
