module BillingHelpers
  extend ActiveSupport::Concern

  included do
    before_action :require_subscription
  end

  def require_subscription
    existing_charges = ShopifyAPI::RecurringApplicationCharge.all
    active_charge = existing_charges.select { |charge| charge.status == 'active' }.sort_by(&:id).last
    accepted_charge = existing_charges.select { |charge| charge.status == 'accepted' }.sort_by(&:id).last
    pending_charge = existing_charges.select { |charge| charge.status == 'pending' }.sort_by(&:id).last

    p 'Found active subscription' and return if active_charge.present?
    accepted_charge.activate and return if accepted_charge.present?

    subscription_price = 2.99

    if pending_charge.blank? || pending_charge.price != subscription_price
      pending_charge = ShopifyAPI::RecurringApplicationCharge.new
      pending_charge.name       = 'Jolted Subscription'
      pending_charge.test       = true # TODO: !Rails.env.production?
      pending_charge.price      = subscription_price # TODO: Set up billing info in config
      pending_charge.return_url = Rails.application.routes.url_helpers.root_url(host: Rails.application.config.host_url)
      pending_charge.save
    end

    redirect_to pending_charge.confirmation_url
  end
end
