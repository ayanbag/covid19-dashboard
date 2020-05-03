import React from 'react';
import { Cards, Chart, Map, CountryList } from './components';
import styles from './App.module.css';
import { fetchData, fetchCountries } from './api/';
import GitHubIcon from '@material-ui/icons/GitHub';

class App extends React.Component {

  state = {
    data: {},
    initialData: {},
    country: '',
  }

  async componentDidMount() {
    const data = await fetchData();

    this.setState({ data: data });
    this.setState({ initialData : data });
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);
    this.setState({data, country: country});
  }

  render() {

    const { data, country, initialData } = this.state;

    return (
      <div className={styles.main}>
        <header className={styles.header}>
          <div className={styles.titleContainer}>
            <h1 className={styles.t1}>COVID-19 Dashboard</h1>
         </div>
          <a href="https://github.com/ayanbag/covid19-dashboard"><GitHubIcon color="disabled" style={{ fontSize: 40 }}/></a>
        </header>
        <div className={styles.container}>
          <CountryList handleCountryChange={this.handleCountryChange} />
          <div className={styles.midContainer}>
            <div className={styles.mapContainer}><Map data={initialData} /></div>
            <Chart data={data} country={country} />
          </div>
          <div className={styles.rightContainer}>
            <Cards data={data} country={country}/>
          </div>
        </div>
      </div>
    )

  }
}

export default App;
