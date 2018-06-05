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
  Dimensions,
  ActivityIndicator
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
            searchValue: ''
      };

  }

  _search = async (searchValue) => {
    this.setState({searchValue})
    console.log(this.state.searchValue);
    // Dispatch searchValue to Actions
    this.props.updateSearchResults(this.state.searchValue)

  }

  // handleSearchUpdate = searchValue => {
  //   this.setState({searchValue})
  // }

  _renderPics(picUrls) {
    const activeProps = { resizeMode: 'contain', width: 300, height: 300 };

    return picUrls.map((item, index) => {
      return (
          <Lightbox key={index} style={styles.picture} activeProps={activeProps} navigator={navigator} underlayColor="white">
          {item ? (
            <Image
              source={{ uri: item }}
              style={{ height: 75, width: 75, resizeMode: "cover" }}
            />
          ) : (
            <View
              style={{ width: 75, height: 75, backgroundColor: "#D3D3D3" }}
            />
          )}
        </Lightbox>
      )
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.welcomeContainer}>
          <Ionicons style={styles.searchIcon} name="md-search" size={32}/>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Search"
            placeholderTextColor={styles.codeHighlightText}
            returnKeyType="done"
            onChangeText={this._search}
            onSubmitEditing={this._search}
          />
          <TouchableOpacity onPress={this._search} style={styles.searchButton}>
            <Text style={styles.helpLinkText}>Search</Text>
          </TouchableOpacity>
        </View>

          {/* Loading */}
          {this.props.loading ? (
            <ActivityIndicator
              size="large"
              color="#2f95dc"
              style={{
                margin: 10
              }}
            />
          ) : null}

          {/* Error Message */}
          {(this.props.error || !Array.isArray(this.props.picUrls) || !this.props.picUrls.length) ? (
            <Text style={styles.error}>You search for "{this.state.searchValue}" returned zero results</Text>
          ) : null}

        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.pictureContainer}>
              {this._renderPics(this.props.picUrls)}
          </View>

        </ScrollView>

      </View>
    );
  }

};

const mapStateToProps = state => {
  return {
    loading: state.loading,
    error: state.error,
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

  welcomeContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 45,
    margin: 25
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
  error: {
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
