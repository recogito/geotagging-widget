import bbox from '@turf/bbox';

const osm = query =>
  fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&polygon_geojson=1`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const first = data[0];

        const lat = parseFloat(first.lat);
        const lng = parseFloat(first.lon);
        const uri = `https://www.openstreetmap.org/${first.osm_type}/${first.osm_id}`;
        const geometry = first.geojson;

        return { lat, lng, uri, geometry };
      }
    });

const whg = query =>
  fetch(`https://whgazetteer.org/api/index/?name=${encodeURIComponent(query)}`)
    .then(res => res.json())
    .then(data => {
      if (data.features.length > 0) {
        const first = data.features[0];

        const { geometry } = first;
        const uri = `https://whgazetteer.org/api/db/?id=${first.properties.place_id}`;
        
        return { lat, lng, uri, geometry };
      }
    });

export default { osm, whg };


