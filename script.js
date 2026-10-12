document.addEventListener("DOMContentLoaded", function () {
  // Initialize map container safely
  const mapElement = document.getElementById("sri-lanka-map");
  if (!mapElement) return;

  const map = L.map("sri-lanka-map", {
    scrollWheelZoom: false
  }).setView([7.5, 80.5], 8);

  // Esri World Street Map Layer
  L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}", {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom'
  }).addTo(map);

  // Route stops for Mr. Wu Yue's sacred pilgrimage & family tour
  const routeStops = [
    {
      day: "27 Nov (Day 1)",
      title: "Anuradhapura",
      stay: "Miridiya Lake Resort",
      coords: [8.3114, 80.4037],
      desc: "Airport arrival (~12:00 PM) & transfer to Anuradhapura."
    },
    {
      day: "28 Nov (Day 2)",
      title: "Sigiriya",
      stay: "Cassandra Culture Resort",
      coords: [7.9570, 80.7600],
      desc: "Sacred Bodhi Tree Puja, Habarana Elephant Safari, Village Tour & Sri Lankan Traditional Lunch."
    },
    {
      day: "29 Nov (Day 3)",
      title: "Kandy",
      stay: "Hotel Senani Kandy",
      coords: [7.2906, 80.6337],
      desc: "Sigiriya Rock Fortress, Temple of Tooth Relic & Cultural Dance Show."
    },
    {
      day: "30 Nov – 01 Dec (Days 4 & 5)",
      title: "Ella",
      stay: "Ella Flower Garden Resort (or Hillcrest Ella)",
      coords: [6.8667, 81.0466],
      desc: "Tea Factory visit, Scenic Train Ride, Nine Arch Bridge & Little Adam's Peak."
    },
    {
      day: "02 Dec (Day 6)",
      title: "Lenagala",
      stay: "Overnight stay at Meditation Center",
      coords: [7.1245, 80.1834],
      desc: "Transfer from Ella to Lenagala Meditation Center."
    },
    {
      day: "03 Dec (Day 7)",
      title: "Negombo",
      stay: "Earl's Regent Negombo",
      coords: [7.2083, 79.8358],
      desc: "Colombo City Tour & beach relaxation in Negombo."
    },
    {
      day: "04 Dec (Day 8)",
      title: "Departure",
      stay: "Departure Transfer",
      coords: [7.1808, 79.8841], // Katunayake Airport
      desc: "Transfer to Bandaranaike International Airport for departure (~12:00 PM)."
    }
  ];

  const routeCoords = [];

  // Add Custom Pins and Popups
  routeStops.forEach((stop, index) => {
    routeCoords.push(stop.coords);

    const customIcon = L.divIcon({
      className: 'custom-map-pin',
      html: `<span>${index + 1}</span>`,
      iconSize: [34, 34],
      iconAnchor: [17, 17]
    });

    const popupContent = `
      <div style="font-family: 'Jost', sans-serif; padding: 4px; max-width: 220px;">
        <span style="background:#0284c7; color:white; font-size:11px; font-weight:bold; padding:2px 8px; border-radius:10px;">${stop.day}</span>
        <h6 style="margin: 6px 0 2px 0; font-weight:800; color:#0f172a; font-size: 14px;">${stop.title}</h6>
        <p style="font-size:12px; margin:0; color:#334155;"><strong>Stay:</strong> ${stop.stay}</p>
        <p style="font-size:12px; margin-top:4px; color:#1e293b; line-height: 1.4;">${stop.desc}</p>
      </div>
    `;

    L.marker(stop.coords, { icon: customIcon })
      .addTo(map)
      .bindPopup(popupContent);
  });

  // Polyline route line
  const polyline = L.polyline(routeCoords, {
    color: '#a8843f',
    weight: 4,
    opacity: 0.9,
    dashArray: '6, 8'
  }).addTo(map);

  // Auto Fit Map View
  const fitMapBounds = () => {
    const isMobile = window.innerWidth < 768;
    const paddingVal = isMobile ? [15, 15] : [35, 35];
    map.fitBounds(polyline.getBounds(), { padding: paddingVal });
  };

  fitMapBounds();

  window.addEventListener('resize', () => {
    map.invalidateSize();
    fitMapBounds();
  });
});