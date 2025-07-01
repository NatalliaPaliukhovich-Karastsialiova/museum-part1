mapboxgl.accessToken = 'pk.eyJ1IjoibWFzaGE5OCIsImEiOiJjbWNrODMxeHQwYnM4Mm9xNGE5c2ZuOWx5In0.BFzhDVEr8_rKfNWkhrTcmg';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v11',
  center: [2.3364, 48.86091],
  zoom: 15
});

map.addControl(new mapboxgl.NavigationControl());

map.on('load', () => {
  map.setPaintProperty('water', 'fill-color', '#C6D0D2');
});

const places = [
  {
    coords: [2.3364, 48.86091],
    color: 'black',
    title: 'Louvre Museum'
  },
  {
    coords: [2.3333, 48.8602],
    color: '#777',
    title: 'Arc de triomphe du Carrousel'
  },
  {
    coords: [2.333, 48.8625],
    color: '#777',
    title: 'Musée des Arts décoratifs'
  },
  {
    coords: [2.3397, 48.8607],
    color: '#777',
    title: 'Sarcophage d\'Abou Roach'
  },
  {
    coords: [2.3365, 48.8587],
    color: '#777',
    title: 'Tunnel des Tuileries'
  }
];

places.forEach(place => {
  new mapboxgl.Marker({ color: place.color })
    .setLngLat(place.coords)
    .setPopup(new mapboxgl.Popup().setText(place.title))
    .addTo(map);
});
