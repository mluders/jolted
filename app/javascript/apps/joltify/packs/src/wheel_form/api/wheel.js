import { camelKeys } from 'js-convert-case';

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

  const response = await fetch('/api/wheel', {
    method: 'PUT',
    headers: {
      'Key-Inflection': 'snake',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      wheel: wheelData.wheel,
      wheelSegmentsAttributes: wheelData.wheelSegments
    })
  });

  const json = await response.json();
  return [response.status, camelKeys(json, { recursive: true })];
}