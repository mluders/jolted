export async function getWheel() {
  const response = await fetch('/api/wheel/edit');
  const json = await response.json();
  return [response.status, json]
}

export async function updateWheel(wheelData) {
  const {
    live,
    popup_background_color,
    popup_font_color,
    popup_accent_color,
    wheel_base_color,
    colorize_wheel,
    background_image_url,
    use_dynamic_discount_codes,
    discount_duration
  } = wheelData;

  const response = await fetch('/api/wheel', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      live,
      popup_background_color,
      popup_font_color,
      popup_accent_color,
      wheel_base_color,
      colorize_wheel,
      background_image_url,
      use_dynamic_discount_codes,
      discount_duration,
      wheel_segments_attributes: wheelData.wheel_segments
    })
  });

  const json = await response.json();
  return [response.status, json];
}
