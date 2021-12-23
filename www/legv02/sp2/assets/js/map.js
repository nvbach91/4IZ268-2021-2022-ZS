import 'ol/ol.css';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import Stamen from 'ol/source/Stamen';
import VectorSource from 'ol/source/Vector';
import View from 'ol/View';
import { Stroke, Style } from 'ol/style';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';

const tileLayer = new TileLayer({
    source: new Stamen({
        layer: 'toner',
    }),
});

const map = new Map({
    layers: [tileLayer],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

const style = new Style({
    stroke: new Stroke({
        color: '#EAE911',
        width: 2,
    }),
});

const flightsSource = new VectorSource({
    wrapX: false,
    loader: function () {
        //const url = '';
        fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {

            });
    },
});

const flightsLayer = new VectorLayer({
    source: flightsSource,
    style: function (feature) {
        if (feature.get('finished')) {
            return style;
        } else {
            return null;
        }
    },
});

map.addLayer(flightsLayer);