import * as React from 'react';
import { View, Text, Dimensions, TextInput, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import rightArrow from "./imgs/right-arrow.png";

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  state = {
    searchItem: "",
    countries: []
  };

  componentDidMount = () => {
    // this.search()
  }

  search = async () => {
    try {
      const res = await fetch("https://restcountries.eu/rest/v2/name/" + this.state.searchItem);
      const countries = await res.json();
      this.setState({ countries });
      console.log("result fetched:===" + JSON.stringify(this.state.countries))
    } catch (error) {
      console.log("error found+_++" + JSON.stringify(error));
    }
  }

  renderCountry = (item) => {
    return (
      <TouchableOpacity style={{
        width: "100%",
        justifyContent: "flex-start",
        flexDirection: "row"
      }}
        onPress={() => {
          // this._onPress(item)
          this.props.navigation.navigate("Weather", { capital: item.capital });
        }}>
        <View style={{ width: "25%", height: 70, padding: 10 }}>
          <Image source={{ uri: item.flag }} style={{ width: "100%", height: "100%", resizeMode: "contain" }}></Image>
        </View>
        <View style={{ width: "60%", backgroundColor: 'white' }}>
          <Text style={{ fontSize: 14, color: "black" }}>{item.name}</Text>
          <Text style={{ fontSize: 12, color: "black" }}>Capital:- {item.capital}</Text>
          <Text style={{ fontSize: 12, color: "black" }}>Population:- {item.population} </Text>
          <Text style={{ fontSize: 12, color: "black" }}>Latlong info:- {JSON.stringify(item.latlng)} </Text>
        </View>
        <View style={{ width: "15%", height: 70, padding: 10 }}>
          <Image source={rightArrow} style={{ width: 25, height: "100%", resizeMode: "contain" }}></Image>
        </View>
      </TouchableOpacity>
    )
  }

  renderSeperator = (item) => {
    return (
      <View
        style={{ width: Dimensions.get("window").width, height: 1, backgroundColor: "grey" }}
      />
    )
  }

  renderEmptypage = (item) => {
    let { searchItem } = this.state;
    return (
      <View
        style={{
          width: Dimensions.get("window").width, height: "100%",
          justifyContent: "center", alignItems: "center"
        }}
      >
        <Text style={{ fontSize: 14, color: "black" }}>{searchItem ? "No data found" : "Search your country"}</Text>
      </View>
    )
  }

  render() {
    let { searchItem, countries } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', padding: 10 }}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Search country by name"
            placeholderTextColor={"black"}
            value={searchItem}
            onChangeText={searchItem => this.setState({ searchItem })} />
          <TouchableOpacity style={styles.submit} activeOpacity={.7}
            disabled={(!searchItem || searchItem == "")}
            onPress={() => this.search()}>
            <Text style={{ fontSize: 12, color: "white" }}>Search</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: "flex-start" }}>
          <FlatList
            contentContainerStyle={{ flex: 1, paddingVertical: 20, alignItems: "flex-start" }}
            data={countries}
            renderItem={({ item, index }) => this.renderCountry(item)}
            ItemSeparatorComponent={this.renderSeperator}
            ListEmptyComponent={this.renderEmptypage}
          />
        </View>
      </View>
    );
  }
}

export default HomeScreen;

const styles = StyleSheet.create({
  inputBox: {
    width: "100%", height: 50,
    flexDirection: "row",
    borderRadius: 10, overflow: "hidden"
  },
  submit: {
    width: 100, height: "100%",
    backgroundColor: "#1E9BCE",
    justifyContent: "center", alignItems: "center"
  },
  input: {
    flex: 1, height: 50,
    borderWidth: 1, paddingLeft: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
})