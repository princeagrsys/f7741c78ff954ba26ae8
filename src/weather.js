import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

class WeatherScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather',
  };
  state = {
    capital: "",
    data: {}
  };

  componentDidMount = () => {
    let { navigation } = this.props;
    let capital = navigation.getParam("capital", null);

    if (capital) {
      this.setState({ capital }, () => {
        console.log("capital:--" + capital)
        this.fetchData();
      })
    }
  }

  fetchData = async () => {
    try {
      const res = await fetch("http://api.weatherstack.com/current?access_key=c530fad53c42c65e2372d803ebfd0813&query=" + this.state.capital);
      const data = await res.json();
      this.setState({ data });
      console.log("result fetched:===" + JSON.stringify(this.state.data))
    } catch (error) {
      console.log("error found+_++" + JSON.stringify(error));
    }
  }

  render() {
    let { data } = this.state;
    return (
      <View style={{ flex: 1, padding: 14, alignItems: "center" }}>
        {(data ?.current ?.weather_icons[0]) && <View style={{ width: "100%", alignItems: "center", paddingVertical: 20 }}>
          <Image source={{ uri: data.current.weather_icons[0] }} style={{ width: 70, height: 70, resizeMode: "contain" }}></Image>
        </View>}
        <Text style={styles.text}>
          Temperature :- {data ?.current ?.temperature} {(data ?.current ?.temperature && " degree ")}
        </Text>
        <Text style={styles.text}>
          Wind Speed :- {data ?.current ?.wind_speed} {(data ?.current ?.wind_speed && "Km/hr ")}
        </Text>
        <Text style={styles.text}>
          Precip :- {data ?.current ?.precip}
        </Text>
      </View>
    );
  }
}

export default WeatherScreen;

const styles = StyleSheet.create({
  text: { fontSize: 18, color: "black", marginBottom: 20 }
})