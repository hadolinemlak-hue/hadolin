import { addClient, getClients, setClients } from './customers.js';
import { addProperty, getProperties, setProperties } from './properties.js';
import { addAppointment, getAppointments, setAppointments } from './appointments.js';
import { updateDashboard } from './dashboard.js';

const LS_KEYS = {
  clients: 'hadolin_clients_v1',
  properties: 'hadolin_properties_v1',
  appointments: 'hadolin_appointments_v1'
};

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage kapalıysa sessizce geç
  }
}

function refresh() {
  updateDashboard(getClients(), getProperties(), getAppointments());
  saveJSON(LS_KEYS.clients, getClients());
  saveJSON(LS_KEYS.properties, getProperties());
  saveJSON(LS_KEYS.appointments, getAppointments());
}

// İlk açılışta kayıtlı veriyi yükle
setClients(loadJSON(LS_KEYS.clients, []));
setProperties(loadJSON(LS_KEYS.properties, []));
setAppointments(loadJSON(LS_KEYS.appointments, []));

document.getElementById('add-client-btn')?.addEventListener('click', () => {
  const name = prompt("Müşteri Ad Soyad");
  if (!name) return;

  const phone = prompt("Telefon (opsiyonel)") || "";
  const budgetRaw = prompt("Bütçe (opsiyonel)") || "0";
  const budget = Number(budgetRaw) || 0;
  const region = prompt("Bölge (opsiyonel)") || "";
  const source = prompt("Kaynak (Sahibinden / Instagram / Referans vs.)") || "Sahibinden";

  addClient({
    name,
    phone,
    budget,
    region,
    source,
    createdAt: new Date().toISOString()
  });

  refresh();
});

refresh();

// PWA: service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(console.error);
}
