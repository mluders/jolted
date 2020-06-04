class WheelsController < AuthenticatedController
  def show
    @wheels = Wheel.where(shop: current_shop)
  end

  def new
    @wheel = WheelService.new_wheel(shop: current_shop)
  end

  def create
    @wheel = Wheel.new(create_params.merge(shop: current_shop))

    if @wheel.save
      redirect_to wheel_path
    else
      flash[:error] = "Could not save wheel"
      render :new
    end
  end

  def edit
  end

  def update
  end

  private

  def create_params
    params.require(:wheel).permit(wheel_segments_attributes: [:label, :gravity])
  end
end
