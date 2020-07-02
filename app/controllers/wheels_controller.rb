class WheelsController < AuthenticatedController
  def show
    redirect_to edit_wheel_path
  end

  def edit
    @wheel = Wheel.find_by(shop: current_shop) || WheelService.new_wheel(shop: current_shop)
  end

  def preview
    redirect_to "#{format_https(current_shop.shopify_domain)}?howdyfox_preview=true"
  end

  def destroy
    @wheel = Wheel.find_by(shop: current_shop).destroy
    redirect_to root_path
  end

  private

  # TODO: Move this to a better spot
  def format_https(url)
    url
      .delete_prefix('http://')
      .delete_prefix('https://')
      .prepend('https://')
  end
end
