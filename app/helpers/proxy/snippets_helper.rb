module Proxy
  module SnippetsHelper
    def shopify_frame_path
      "apps/joltify/frame/#{params[:id]}"
    end
  end
end
