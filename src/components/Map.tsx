import React, { useRef, useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapObserver from "../store/map";
import { observer } from "mobx-react-lite";
import axios from 'axios';
//@ts-ignore
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import geoJson from "./chicago-parks.json";
import CustomMarker from './Marker';
 
mapboxgl.accessToken = 'pk.eyJ1IjoiYXN0aWtpbiIsImEiOiJjbGJkZDF5NGwwMDl0M3BvMDhocTljMGs5In0.ynCQEC2NEX1PfFQkafdTRQ';

interface IInital {
  lng: number;
  lat: number;
  zoom: number;
}

const MapBox = observer(() => {
  const [cords, setCords] = useState<IInital>({
    lng: -122.4,
    lat: 37.8,
    zoom: 2
  });
  const [markers, setMarkers] = useState<any>([]);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    //profile
    const coordinates: any = [[]];
    axios.get(`https://api.mapbox.com/directions/v5/mapbox/driving/10%2C10%3B20%2C20?alternatives=true&geometries=geojson&language=en&overview=simplified&steps=true&access_token=${MapObserver.token}`).then(req => console.log(req.data))
  }, [])

  useEffect(() => {
    let arr = [];

    for(let i = 0; i < 20; i++) {
      arr[i] = {
        lat: Math.random() * 40,
        lng: Math.random() * -120,
      }
    }

    setMarkers(arr);
  }, [])

  useEffect(() => {
    const res: any = [markers[0]];

    for(let i = 0; i < markers.length; i++) {
      for(let j = 0; j < res.length; j++) {
        if(Math.abs(markers[i].lng - res[j].lng) < 3 && Math.abs(markers[i].lat - res[j].lat) < 3) {
          console.log("group: ", Math.abs(markers[i].lng - res[j].lng), Math.abs(markers[i].lat - res[j].lat))
        } else if(!res.includes(markers[i])) {
          res.push(markers[i]);
        }
      }
    }

    console.log(res)
  }, [cords.zoom])


  return (
    <Map
      ref={mapRef}
      mapboxAccessToken={MapObserver.token}
      initialViewState={{
        longitude: cords.lng,
        latitude: cords.lat,
        zoom: cords.zoom
      }}
      style={{ width: '100%', height: '100vh', }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onZoom={(e) => setCords(prev => ({...prev, zoom: e.viewState.zoom}))}
    >
      {markers.map((marker: any) => <CustomMarker lng={marker.lng} lat={marker.lat} />)}
      <CustomMarker lng={cords.lng} lat={cords.lat} />
      <NavigationControl showCompass={false} style={{ transform: "rotate(90deg)", marginRight: "100px" }} />
    </Map>
  );
})

export default MapBox;