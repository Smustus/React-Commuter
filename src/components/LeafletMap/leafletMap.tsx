import React, { useEffect, useState } from 'react'
import './leafletMap.css'
import L, { LayerGroup, Map } from 'leaflet';
import { fetchNearby, fetchTimetable } from '../../utilities/fetch';
import { StopLocation } from '../../interfaces/interfaces';

interface LeafletMapProps {
  position: GeolocationCoordinates | undefined;
  setSelectedStation: any;
  setActiveSection: any;
  setDepartures: any;
}

interface StopData {
  StopLocation: StopLocation;
}


const LeafletMap = ({position, setSelectedStation, setActiveSection, setDepartures}: LeafletMapProps) => {

  const [map, setMap] = useState<Map>();

  useEffect(() => {
    if (!map && position?.latitude) {
      const createMap = L.map('map').setView([position?.latitude, position?.longitude], 13);
      L.marker([position?.latitude, position?.longitude]).addTo(createMap);

      setMap(createMap);
    }
  }, [position]);

  useEffect(() => {
    if(map && position?.latitude && position?.longitude){
      async function getAll(){

        if(position?.latitude && position?.longitude){
          const data = await fetchNearby(position.latitude, position.longitude, 500, 5000);

          data.forEach((obj: StopData) => {            
            if (!map) return;
            const marker = L.marker([obj?.StopLocation.lat, obj?.StopLocation.lon]).addTo(map);
            marker.bindPopup(obj?.StopLocation.name).openPopup();
            marker.addEventListener('click', () => {
              getTimeTable(obj.StopLocation.extId);
            });
          })
        }
      }
      getAll()
    }
  }, [map]);

  async function getTimeTable(id: string){
    const data = await fetchTimetable(id);
    console.log(data);
    if(data){
      setDepartures(data.departuresData);
    }
    setSelectedStation(id);
    setActiveSection('map');
  }

  useEffect(() => {
    if(map){
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
    }
  }, [map]);

  
  return (
    <div id="map"></div>
  )
}

export default LeafletMap