export function updateDashboard(clients = [], properties = [], appointments = []) {
  const todayCalls = document.getElementById('today-calls');
  const activeProps = document.getElementById('active-properties');
  const todayApps = document.getElementById('today-appointments');
  const hotClients = document.getElementById('hot-clients');

  if (todayCalls) todayCalls.textContent =
    '📞 Bugün Aranacak Kiralık Müşteriler: ' + clients.length;

  if (activeProps) activeProps.textContent =
    '🏢 Aktif Kiralık İlanlar: ' + properties.length;

  if (todayApps) todayApps.textContent =
    '📅 Bugünkü Kiralık Randevular: ' + appointments.length;

  // Basit örnek: bütçesi olan ve son 7 günde eklenenleri "sıcak" say
  const now = Date.now();
  const hot = clients.filter(c => {
    const t = Date.parse(c.createdAt || '') || 0;
    const recent = (now - t) <= 7 * 24 * 60 * 60 * 1000;
    const hasBudget = Number(c.budget || 0) > 0;
    return recent && hasBudget;
  }).length;

  if (hotClients) hotClients.textContent =
    '🔥 Sıcak Kiralık Müşteriler: ' + hot;
}
