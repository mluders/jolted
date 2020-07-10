export async function directUploadToS3(file, presigned_url, presigned_url_fields) {
  const formData = new FormData();

  for (let field in presigned_url_fields) {
    formData.append(field, presigned_url_fields[field])
  }

  formData.append('Content-Type', file.type)
  formData.append('file', file);

  const response = await fetch(presigned_url, {
    method: 'POST',
    body: formData
  });

  const xmlString = await response.text();

  if (response.status == 201) {
    const location = parseXMLTag(xmlString, 'Location');
    return location;
  } else {
    throw xmlString;
  }
}

function parseXMLTag(xmlString, tagName) {
  const parser = new DOMParser();
  const xml = parser.parseFromString(xmlString, 'text/xml');
  const tagValue = xml.getElementsByTagName(tagName)[0].textContent;

  return tagValue;
}
