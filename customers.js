let clients = [];

export function setClients(arr = []) {
  clients = Array.isArray(arr) ? arr : [];
}

export function addClient(client) {
  clients.push(client);
  console.log("Clients:", clients);
}

export function getClients() {
  return clients;
}
