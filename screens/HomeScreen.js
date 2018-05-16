import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  navigator,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import axios from 'axios';
import Lightbox from 'react-native-lightbox';

import { flickrKey, flickrSecret } from '../config';
import {updateSearchResults} from '../actions/actions'

// Navigation
export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props);
      this.state = {
            searchValue: '',
            picIds: undefined,
            picUrls: []
      };
      // this._search = this._search.bind(this);
      // this._getSearchResults = this._getSearchResults.bind(this);
      // this._renderPics = this._renderPics.bind(this);

  }



  _getSearchResults = async () => {
    let response = await axios.get(
      `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${
        flickrKey
      }&tags=${this.state.searchValue}&format=json&nojsoncallback=1`
    )
    return response;
  }

  _search = async () => {
    let response = await this._getSearchResults();

    this.setState ({ picIds: response.data.photos.photo })
    // console.log(this.state.picIds);

    // Transform for picture request urls array
    let results = this.state.picIds.map((item, index) => {
      return (
        `https://farm${item.farm}.staticflickr.com/${item.server}/${item.id}_${item.secret}_n.jpg`
      )
    });
    this.setState ({ picUrls: results })
    console.log(this.state.picUrls);

    // Send picUrls to Actions
    this.props.updateSearchResults(this.state.picUrls)

    this._renderPics(this.props.picUrls)

  }
//
  _renderPics(picUrls) {
  // const { height, width} = Dimensions.get('window');
  const activeProps = { resizeMode: 'contain', width: 300, height: 300 };

    // if (this.state.picUrls !== undefined) {
    try {
      return picUrls.map((item, index) => {
        return (
            <Lightbox key={index} style={styles.picture} activeProps={activeProps} navigator={navigator} underlayColor="white">
            {item ? (
              <Image
                source={{ uri: item }}
                style={{ height: 75, width: 75, resizeMode: "cover" }}
                // style={{flex:1, height: undefined, width: undefined}}
                // resizeMode="contain"
              />
            ) : (
              <View
                style={{ width: 75, height: 75, backgroundColor: "#D3D3D3" }}
              />
            )}
          </Lightbox>
        )
      });
    } catch (e) {
      console.log(e);
    }
    // } else {
    //   alert('Search Pics')
    // }
  }

  handleSearchUpdate = searchValue => {
    this.setState({searchValue})
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Ionicons style={styles.searchIcon} name="md-search" size={32}/>
            <TextInput
              style={styles.input}
              underlineColorAndroid="transparent"
              placeholder="Search"
              placeholderTextColor={styles.codeHighlightText}
              returnKeyType="search"
              value={this.state.searchValue}
              onChangeText={this.handleSearchUpdate}
              onSubmitEditing={this._search}
            />
            <TouchableOpacity onPress={this._search} style={styles.searchButton}>
              <Text style={styles.helpLinkText}>Search</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.pictureContainer}>
              {this._renderPics(this.state.picUrls)}
          </View>

        </ScrollView>
      </View>
    );
  }

  // _search = () => {};

  // _handleLearnMorePress = () => {
  //   WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
  // };

};

const mapStateToProps = state => {
  return {
    picUrls: state.picUrls
    }
};


export default connect(mapStateToProps, {updateSearchResults})(
  HomeScreen
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'center',
    margin: 20,
    height: 40
  },
  searchIcon: {
    paddingHorizontal: 10
  },
  input: {
    width: 175,
    borderWidth: 1
  },
  searchButton: {
    borderWidth: 1
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  pictureContainer: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 2,
      },
    }),
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  picture: {
    alignItems: 'center',
    width: 75,
    height: 75,
    backgroundColor: "#D3D3D3",
    paddingHorizontal: 10,
    margin: 10
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
    alignItems: 'center',
    padding: 10
  },
});
