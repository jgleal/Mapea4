// import { map } from 'M/mapea';
import Searchstreet from 'plugins/searchstreet/facade/js/searchstreet';

const mapjs = M.map({
  container: 'map',
  controls: ['mouse', 'layerswitcher'],
});

mapjs.addPlugin(new Searchstreet({}));

window.mapjs = mapjs;
