let properties = [];

export function setProperties(arr = []) {
  properties = Array.isArray(arr) ? arr : [];
}

export function addProperty(prop) {
  properties.push(prop);
  console.log("Properties:", properties);
}

export function getProperties() {
  return properties;
}
