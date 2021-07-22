import React from 'react';
import '../style/Map.css';
import { Map as LeafLetMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './utils';
function Map({ center, zoom, countries, casesType }) {
  return (
    <div className="map">
      <LeafLetMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default Map;
