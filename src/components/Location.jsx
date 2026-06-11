import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './Location.module.css';

const STONEHAVEN = [-37.8745375, 145.0605637];

const CATEGORIES = {
  project:   { label: '1Stonehaven',   color: '#C5A880', icon: '🏠' },
  food:      { label: 'Food & Drink',  color: '#E86452', icon: '🍽' },
  shopping:  { label: 'Shopping',      color: '#9B5DE5', icon: '🛍' },
  parks:     { label: 'Parks & Rec',   color: '#4CAF50', icon: '🌿' },
  transport: { label: 'Transport',     color: '#4A90D9', icon: '🚆' },
  education: { label: 'Schools',       color: '#00B4D8', icon: '🎓' },
  medical:   { label: 'Medical',       color: '#FF6B6B', icon: '🏥' },
};

const POIS = [
  // Food & Drink
  { name: 'The Meat & Wine Co', cat: 'food', coords: [-37.886295, 145.080512], dist: '3.0km', drive: '7 min' },
  { name: 'Riserva Wine', cat: 'food', coords: [-37.864828, 145.049597], dist: '1.5km', drive: '3 min' },
  { name: 'Grazia Restaurant', cat: 'food', coords: [-37.864247, 145.050193], dist: '1.5km', drive: '3 min' },
  // Shopping
  { name: 'Upper Glen Iris Shopping', cat: 'shopping', coords: [-37.858994, 145.064426], dist: '1.8km', drive: '4 min' },
  { name: 'Carnegie Central', cat: 'shopping', coords: [-37.884729, 145.058649], dist: '1.8km', drive: '5 min' },
  { name: 'Caulfield Village', cat: 'shopping', coords: [-37.877500, 145.042000], dist: '2.3km', drive: '5 min' },
  // Parks
  { name: 'Caulfield Racecourse', cat: 'parks', coords: [-37.877084, 145.038777], dist: '2.2km', drive: '5 min' },
  { name: 'Malvern Valley Golf Course', cat: 'parks', coords: [-37.875964, 145.077857], dist: '2.0km', drive: '5 min' },
  { name: 'Hedgeley Dene Gardens', cat: 'parks', coords: [-37.868839, 145.053483], dist: '450m', drive: '1 min' },
  { name: 'Gardiners Creek Trail', cat: 'parks', coords: [-37.875323, 145.071850], dist: '1.2km', drive: '3 min' },
  // Transport
  { name: 'East Malvern Station', cat: 'transport', coords: [-37.876940, 145.069330], dist: '1.1km', drive: '3 min' },
  { name: 'Darling Station', cat: 'transport', coords: [-37.868940, 145.062880], dist: '800m', drive: '3 min' },
  // Education
  { name: 'Caulfield Grammar', cat: 'education', coords: [-37.876111, 145.003056], dist: '5.2km', drive: '10 min' },
  { name: 'Ashwood High School', cat: 'education', coords: [-37.864239, 145.103561], dist: '4.8km', drive: '10 min' },
  { name: 'Holmesglen Institute', cat: 'education', coords: [-37.876010, 145.086210], dist: '2.4km', drive: '5 min' },
  { name: "St Mary's Primary", cat: 'education', coords: [-37.8726336, 145.0526872], dist: '800m', drive: '2 min' },
  { name: 'Lloyd St Primary', cat: 'education', coords: [-37.872477, 145.056758], dist: '300m', drive: '1 min' },
  { name: 'Malvern Primary', cat: 'education', coords: [-37.871031, 145.037924], dist: '2.5km', drive: '5 min' },
  { name: 'Sacre Coeur', cat: 'education', coords: [-37.861389, 145.051944], dist: '1.8km', drive: '4 min' },
  { name: 'Korowa', cat: 'education', coords: [-37.861389, 145.054444], dist: '1.7km', drive: '4 min' },
  // Medical
  { name: 'Cabrini Malvern', cat: 'medical', coords: [-37.861757, 145.032651], dist: '3.0km', drive: '7 min' },
];

const AMENITY_PILLS = [
  { icon: '🌿', title: 'Hedgeley Dene Gardens', time: '6 min walk', color: '#4CAF50' },
  { icon: '🚆', title: 'Darling Station', time: '10 min walk', color: '#4A90D9' },
  { icon: '🛍', title: 'Chadstone Shopping', time: '8 min drive', color: '#9B5DE5' },
  { icon: '🎓', title: "St Mary's Primary", time: '10 min walk', color: '#00B4D8' },
  { icon: '🏥', title: 'Cabrini Malvern', time: '7 min drive', color: '#FF6B6B' },
];

// Custom markers using standard Leaflet DivIcon
const projectIcon = L.divIcon({
  className: '',
  html: `<div class="sh-thumb">
           <img src="images/B&S_CAM_7_Exterior_Front.webp" alt="1Stonehaven" />
           <div class="sh-thumb-label">1STONEHAVEN</div>
         </div>`,
  iconSize: [120, 90],
  iconAnchor: [60, 100],
  popupAnchor: [0, -95]
});

const createPoiIcon = (cat) => L.divIcon({
  className: '',
  html: `<div class="sh-poi-marker">${cat.icon}</div>`,
  iconSize: [36, 36],
  iconAnchor: [18, 18],
  popupAnchor: [0, -20]
});

const createMidpointIcon = (poi) => L.divIcon({
  className: '',
  html: `<div class="sh-dist-badge" style="border-color:#C5A880">
    <strong style="color:#C5A880">🚗 ${poi.dist}</strong>
    <span style="color:rgba(255,255,255,.6);font-size:10px">${poi.drive} drive</span>
    <small>${poi.name.toUpperCase()}</small>
  </div>`,
  iconSize: [200, 52],
  iconAnchor: [100, 26]
});

// React Controller Component for Map bounds and flyTo transitions
function MapController({ activePoi, activeCoords }) {
  const map = useMap();

  useEffect(() => {
    if (activeCoords && activeCoords.length > 0) {
      const bounds = L.latLngBounds([STONEHAVEN, activeCoords[activeCoords.length - 1]]);
      map.fitBounds(bounds.pad(0.18), { animate: true, duration: 0.8 });
    } else if (activePoi) {
      map.flyTo(activePoi.coords, 15, { animate: true, duration: 0.8 });
    } else {
      map.flyTo(STONEHAVEN, 15, { animate: true, duration: 0.8 });
    }
  }, [activePoi, activeCoords, map]);

  return null;
}

// React Events Handler Component to catch click events outside of markers
function PoiMarker({ poi, cat, isActive, onHover, onClick }) {
  const markerRef = useRef(null);

  useEffect(() => {
    if (isActive && markerRef.current) {
      markerRef.current.openPopup();
    }
  }, [isActive]);

  return (
    <Marker 
      ref={markerRef}
      position={poi.coords}
      icon={createPoiIcon(cat)}
      eventHandlers={{
        mouseover: () => onHover(poi),
        mouseout: () => onHover(null),
        click: () => onClick(poi)
      }}
    >
      <Popup>
        <div className="sh-popup-title">{poi.name}</div>
        <div className="sh-popup-sub">{cat.label}</div>
        <div className="sh-popup-dist">
          {poi.dist} <span>· {poi.drive} drive</span>
        </div>
      </Popup>
    </Marker>
  );
}

function MapEventsHandler({ onClear }) {
  useMapEvents({
    click() {
      onClear();
    }
  });
  return null;
}

export default function Location() {
  const [activePoi, setActivePoi] = useState(null);
  const [hoveredPoi, setHoveredPoi] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);
  const [routeCache, setRouteCache] = useState({});

  const handleCardClick = (title) => {
    let poiMatch = null;
    if (title === 'Chadstone Shopping') {
      poiMatch = POIS.find(p => p.name === 'The Meat & Wine Co');
    } else {
      poiMatch = POIS.find(p => p.name.toLowerCase() === title.toLowerCase());
    }

    if (poiMatch) {
      if (activePoi && activePoi.name === poiMatch.name) {
        handleClearRoute();
      } else {
        handlePoiClick(poiMatch);
      }
    }
  };

  const isCardActive = (title) => {
    if (!activePoi) return false;
    if (title === 'Chadstone Shopping') {
      return activePoi.name === 'The Meat & Wine Co';
    }
    return activePoi.name.toLowerCase() === title.toLowerCase();
  };

  // Trigger OSRM driving route loading
  const handlePoiClick = (poi) => {
    setActivePoi(poi);
    const cacheKey = poi.coords.join(',');

    if (routeCache[cacheKey]) {
      setRouteCoords(routeCache[cacheKey]);
      return;
    }

    // Direct driving routes using OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${STONEHAVEN[1]},${STONEHAVEN[0]};${poi.coords[1]},${poi.coords[0]}?overview=full&geometries=geojson`;
    fetch(osrmUrl)
      .then(r => r.json())
      .then(data => {
        if (data.routes && data.routes[0]) {
          const latlngs = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          setRouteCache(prev => ({ ...prev, [cacheKey]: latlngs }));
          setRouteCoords(latlngs);
        } else {
          setRouteCoords([STONEHAVEN, poi.coords]);
        }
      })
      .catch(() => {
        setRouteCoords([STONEHAVEN, poi.coords]);
      });
  };

  const handleClearRoute = () => {
    setActivePoi(null);
    setRouteCoords([]);
  };

  // Middlepoint calculator for dynamic driving label placement
  const getMidpoint = () => {
    if (routeCoords.length > 0) {
      const idx = Math.floor(routeCoords.length / 2);
      return routeCoords[idx] || [(STONEHAVEN[0] + activePoi.coords[0]) / 2, (STONEHAVEN[1] + activePoi.coords[1]) / 2];
    }
    return null;
  };

  const midpoint = getMidpoint();

  return (
    <section id="location" className={styles.location}>
      <div className="container">
        
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={styles.label}>Your Neighbourhood</span>
          <h2 className={styles.heading}>
            Malvern East — leafy streets<br />and effortless connection.
          </h2>
          <p className={styles.description}>
            Local parks, playgrounds and green spaces are woven into the everyday rhythm, offering a calm and highly liveable setting for families.
          </p>
        </motion.div>

        {/* Address badge */}
        <motion.div
          className={styles.addressBadge}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span style={{ fontSize: '14px' }}>📍</span>
          <span className={styles.addressText}>
            1 Stonehaven Avenue, Malvern East VIC 3145
          </span>
        </motion.div>

        {/* Map Container */}
        <motion.div
          className={styles.mapWrapper}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <MapContainer 
            center={STONEHAVEN} 
            zoom={15} 
            scrollWheelZoom={false}
            zoomControl={true}
            attributionControl={false}
            style={{ width: '100%', height: '100%' }}
          >
            <TileLayer 
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              maxZoom={19}
            />

            {/* Custom map controllers and listeners */}
            <MapController activePoi={activePoi} activeCoords={routeCoords} />
            <MapEventsHandler onClear={handleClearRoute} />

            {/* Pulsing project location marker */}
            <Marker position={STONEHAVEN} icon={projectIcon}>
              <Popup>
                <div className="sh-popup-title">1STONEHAVEN</div>
                <div className="sh-popup-sub">1 Stonehaven Avenue, Malvern East</div>
              </Popup>
            </Marker>



            {/* POI markers */}
            {POIS.map((poi, idx) => {
              const cat = CATEGORIES[poi.cat];
              return (
                <PoiMarker 
                  key={idx}
                  poi={poi}
                  cat={cat}
                  isActive={activePoi && activePoi.name === poi.name}
                  onHover={setHoveredPoi}
                  onClick={handlePoiClick}
                />
              );
            })}

            {/* Declarative Hover Badge Marker */}
            {hoveredPoi && !activePoi && (
              <Marker 
                position={hoveredPoi.coords} 
                interactive={false}
                icon={L.divIcon({
                  className: '',
                  html: `<div class="sh-label" style="border-color:#C5A880">${CATEGORIES[hoveredPoi.cat].icon} ${hoveredPoi.name} <span class="sh-label-dist">${hoveredPoi.dist}</span></div>`,
                  iconSize: [220, 32],
                  iconAnchor: [110, -8]
                })}
              />
            )}

            {/* Dynamic Polyline Driving Routes */}
            {routeCoords.length > 0 && activePoi && (
              <>
                <Polyline 
                  positions={routeCoords} 
                  pathOptions={{ color: '#C5A880', weight: 10, opacity: 0.15, lineCap: 'round', lineJoin: 'round' }} 
                />
                <Polyline 
                  positions={routeCoords} 
                  pathOptions={{ color: '#C5A880', weight: 3, opacity: 0.85, dashArray: '10, 8', lineCap: 'round' }}
                  className="walking-route-animate"
                />
              </>
            )}

            {/* Declarative Midpoint route badge */}
            {midpoint && activePoi && (
              <Marker 
                position={midpoint} 
                interactive={false} 
                icon={createMidpointIcon(activePoi)} 
              />
            )}

          </MapContainer>
        </motion.div>

        {/* Amenity Pills */}
        <div className={styles.amenityPills}>
          {AMENITY_PILLS.map((pill, i) => {
            const active = isCardActive(pill.title);
            const pillStyle = active 
              ? { backgroundColor: pill.color, borderColor: pill.color } 
              : {};
            return (
              <button
                key={i}
                className={`${styles.amenityPill} ${active ? styles.amenityPillActive : ''}`}
                style={pillStyle}
                onClick={() => handleCardClick(pill.title)}
              >
                <span className={styles.pillIcon}>{pill.icon}</span>
                <span className={styles.pillText}>
                  {pill.title} <span className={styles.pillTime}>({pill.time})</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          {Object.entries(CATEGORIES).filter(([key]) => key !== 'project').map(([key, cat]) => (
            <div key={key} className={styles.legendItem}>
              <span className={styles.legendIcon}>{cat.icon}</span>
              {cat.label}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
