Rails.application.routes.draw do
  root :to => 'home#index'
  mount ShopifyApp::Engine, at: '/'

  resource :wheel

  namespace :proxy, path: '/apps/joltify' do
    resources :shops, only: :none do
      resource :snippet, only: [:show]
      resource :frame, only: [:show]
      resource :wheel, only: [:show]
      resources :discount_codes, only: [:create]
    end
  end
end
