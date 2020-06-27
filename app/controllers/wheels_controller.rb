class WheelsController < AuthenticatedController
  def show
    redirect_to edit_wheel_path
  end

  def edit
    @wheel = Wheel.find_by(shop: current_shop) || WheelService.new_wheel(shop: current_shop)
  end

  def destroy
    @wheel = Wheel.find_by(shop: current_shop).destroy
    redirect_to root_path
  end
end
