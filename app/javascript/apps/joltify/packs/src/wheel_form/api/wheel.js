export async function getWheel() {
  const response = await fetch('/api/wheel/edit', {
    headers: {
      'Key-Inflection': 'camel',
      'Content-Type': 'application/json'
    }
  });

  const json = await response.json();
  return [response.status, json]
}

export async function updateWheel(wheelData) {
  const {
    live,
    popupBackgroundColor,
    popupFontColor,
    popupAccentColor,
    wheelBaseColor,
    colorizeWheel,
    useDynamicDiscountCodes
  } = wheelData;

  const response = await fetch('/api/wheel', {
    method: 'PUT',
    headers: {
      'Key-Inflection': 'camel',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      live,
      popupBackgroundColor,
      popupFontColor,
      popupAccentColor,
      wheelBaseColor,
      colorizeWheel,
      useDynamicDiscountCodes,
      wheelSegmentsAttributes: wheelData.wheelSegments
    })
  });

  const json = await response.json();
  return [response.status, json];
}