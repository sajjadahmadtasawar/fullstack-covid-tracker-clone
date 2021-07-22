import { useEffect, useState } from 'react';
import { prettyStat, sortData } from './component/utils';
import {
  MenuItem,
  Select,
  FormControl,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import './App.css';
import InfoBox from './component/InfoBox';
import Map from './component/Map';
import Table from './component/Table';
import LineGraph from './component/LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({
    lat: 34.80746,
    lng: -40.4796,
  });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState('cases');

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  const handleCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode);

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
        {
          url === 'https://disease.sh/v3/covid-19/all'
            ? setMapCenter({ lat: 34.80746, lng: -40.4796 })
            : setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        }
        {
          url === 'https://disease.sh/v3/covid-19/all'
            ? setMapZoom(3)
            : setMapZoom(4);
        }
      });
  };

  useEffect(() => {
    const getCountries = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countriesData = data.map((country) => ({
            country: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countriesData);
        });
    };
    getCountries();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker</h1>
          <FormControl>
            <Select
              variant="outlined"
              value={country}
              onChange={handleCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__Stats">
          <InfoBox
            isRed
            isActive={casesType === 'cases'}
            onClick={(e) => setCasesType('cases')}
            title="Coronavirus Cases"
            cases={prettyStat(countryInfo.todayCases)}
            total={prettyStat(countryInfo.cases)}
          />
          <InfoBox
            isActive={casesType === 'recovered'}
            onClick={(e) => setCasesType('recovered')}
            title="Recovered"
            cases={prettyStat(countryInfo.todayRecovered)}
            total={prettyStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            isActive={casesType === 'deaths'}
            onClick={(e) => setCasesType('deaths')}
            title="Deaths"
            cases={prettyStat(countryInfo.todayDeaths)}
            total={prettyStat(countryInfo.deaths)}
          />
        </div>
        <Map
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
          casesType={casesType}
        />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table data={tableData} />
          <h3 className="graph__title">Worldwide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
