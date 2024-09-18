import { useEffect, useState } from 'react'
import './App.css'
import LeafletMap from './components/LeafletMap/leafletMap';
import { getPosition, fetchNearby, fetchTimetable } from './utilities/fetch';
import Tablecell from './components/TableCell/tableCell';
import TableBody from './components/TableBody/tableBody';
import TableRow from './components/TableRow/tableRow';
import TableHeader from './components/TableHeader/tableHeader';
import TableHead from './components/TableHead/tableHead';
import Header from './components/Header/header';
import SearchForm from './components/SearchForm/searchForm';
import { FormState } from './interfaces/interfaces';

function App() {

  const [position, setPosition] = useState<GeolocationCoordinates>();
  const [nearbyData, setNearbyData] = useState<any[]>([]);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [departures, setDepartures] = useState<any[]>([]);
  const [activeRow, setActivRow] = useState<number | null>(null);
  const [inputValue, setInputValue] = useState<FormState>({ searchFrom: '', searchTo: '' });
  const [searchResults, setSearchResults] = useState<any>();
  const [route, setRoute] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<'searchResults' | 'nearby' | 'map' | null>(null);
  
  useEffect(() => {   
    getPosition(setPosition);
  }, []);

  useEffect(() => {
    /* console.log(inputValue); */
    console.log(selectedStation);
    console.log(departures);
    /* console.log(searchResults); */
    console.log(route);
  }, [inputValue, selectedStation, departures, searchResults, route]);

  async function getNearby(){
    if(position){
      const data = await fetchNearby(position.latitude, position.longitude, 10, 1000);
      console.log(data);
      setNearbyData(data);
      setActiveSection('nearby');
    } else return
  }

  async function getTimeTable(id: string, index: number){
    setActivRow(index)
    const data = await fetchTimetable(id);
    console.log(data);
    if(data){
      setDepartures(data.departuresData);
    }
    setSelectedStation(id);
   
  }

  async function setTrip(routeData: any, index: number){
    setActivRow(index)
    setRoute(routeData);
  }

  
  return (
    <>
      <Header>
        <h1 className='pageHeader'>CityTransit - Pendlaren</h1>
      </Header>

      <SearchForm setInputValue={setInputValue} inputValue={inputValue} setActiveSection={setActiveSection} setSearchResults={setSearchResults} />
    
      <button onClick={getNearby}>Hitta närliggande</button>

      <LeafletMap position={position} setSelectedStation={setSelectedStation} setActiveSection={setActiveSection} setDepartures={setDepartures} />

      <main className='main'>
        <section className='timetable'>
        {
          activeSection === 'searchResults' && searchResults?.length > 0 && (
            <TableBody>
              <TableHead>
                <TableHeader>Tid</TableHeader>
                <TableHeader>Riktning</TableHeader>
                <TableHeader>Fordon</TableHeader>
              </TableHead>
              {
                searchResults.map((route: any, index: number) => {
                  return route.LegList.Leg.map((obj: any, i: number) => {
                    return obj.type !== "WALK" ?
                      (
                        <TableRow key={i} onClick={() => {
                          setTrip(obj, index)}} 
                          interactive={true}       
                          active={activeRow === index ? true : false}>
                          <Tablecell>{`${obj.Origin.time} - ${obj.Destination.time}`}</Tablecell>
                          <Tablecell>{`${obj.Origin.name} - ${obj.Destination.name}`}</Tablecell>
                          <Tablecell>{obj.name}</Tablecell>
                        </TableRow>
                      ) : "" 
                    }
                  )
                })
              }
            </TableBody>
          )
        }
        {
          activeSection === 'searchResults' && route && (
            <TableBody>
              <TableHead>
                <TableHeader>Tid</TableHeader>
                <TableHeader>Hållplats</TableHeader>
              </TableHead>
              {
                route.Stops ? 
                route.Stops.Stop.map((obj: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <Tablecell>{`${obj.depTime ? obj.depTime : obj.arrTime}`}</Tablecell>
                      <Tablecell>{`${obj.name}`}</Tablecell>
                    </TableRow>
                  )
                }) : ""
              }
            </TableBody>
          )
        }

        {
          activeSection === 'nearby' && nearbyData.length > 0 && (
            <TableBody>
              <TableHead>
                <TableHeader>Hållplats</TableHeader>
                <TableHeader>Avstånd</TableHeader>
              </TableHead>
              {
                nearbyData.map((location, index) => (
                  <TableRow key={index} onClick={() => {
                    getTimeTable(location.StopLocation.extId, index)}} 
                    interactive={true}       
                    active={activeRow === index ? true : false}>
          
                    <Tablecell>{location.StopLocation.name}</Tablecell>
                    <Tablecell>{`${location.StopLocation.dist} m`}</Tablecell>
                  </TableRow>
                ))
              }
            </TableBody>
          )
        }
        {
          activeSection === 'nearby'  && selectedStation && (
            <TableBody>
              <TableHead>
                <TableHeader>Avgångstidx</TableHeader>
                <TableHeader>Fordon</TableHeader>
                <TableHeader>Slutstation</TableHeader>
              </TableHead>
              {
                departures ? (departures?.map((destination, index) => {
                  return (
                    <TableRow key={index}>
                      <Tablecell>{`${destination.time}`}</Tablecell>
                      <Tablecell>{`${destination.name}`}</Tablecell>
                      <Tablecell>{`${destination.direction}`}</Tablecell>
                    </TableRow>
                  )
                })) : 
                <TableRow>
                  <Tablecell>Inga avgångar funna</Tablecell>
                </TableRow>
              }
            </TableBody>
          )
        }

        {
          activeSection === 'map' && selectedStation && departures && (
            <TableBody>
              <TableHead>
                <TableHeader>Tidx</TableHeader>
                <TableHeader>Fordon</TableHeader>
                <TableHeader>Slutstation</TableHeader>
              </TableHead>
              {
                departures.map((obj, index) => {
                  return (
                    <TableRow key={index} onClick={() => {
                      setTrip(obj, index)}} 
                      interactive={false}       
                      active={activeRow === index ? true : false}>
                      <Tablecell>{`${obj.time}`}</Tablecell>
                      <Tablecell>{`${obj.name}`}</Tablecell>
                      <Tablecell>{obj.direction}</Tablecell>
                    </TableRow>)
                })
              }
            </TableBody>
          )
        }
        {/* {
          activeSection === 'map' && route && (
            <TableBody>
              <TableHead>
                <TableHeader>Tid</TableHeader>
                <TableHeader>Hållplats</TableHeader>
              </TableHead>
              {
                route.map((obj: any, index: number) => {
                  return (
                    <TableRow key={index}>
                      <Tablecell>{`${obj.depTime ? obj.depTime : obj.arrTime}`}</Tablecell>
                      <Tablecell>{`${obj.name}`}</Tablecell>
                    </TableRow>
                  )
                }) 
              }
            </TableBody>
          )
        } */}

        </section>
      </main>
    </>
  )
}

export default App
