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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MonoText } from '../components/StyledText';
import { connect } from 'react-redux';
import axios from 'axios';
// import PropTypes from 'prop-types'

import { flickrKey, flickrSecret } from '../config';
import {updateSearchResults} from '../actions/actions'

// Navigation
export class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  }

  // static propTypes = {
  //   updateSearchResults: PropTypes.func
  // }
  //
  // state = {
  //   seachValue: ''
  // }

  constructor(props) {
    super(props);
      this.state = {
        seachValue: ''
      };
      this._search = this._search.bind(this);
  }

  _search = async () => {
    this.props.updateSearchResults(this.state.seachValue)
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
              value={this.state.seachValue}
              onChangeText={text => this.setState({ seachValue: text })}
              onSubmitEditing={this._search}
            />
            {/* <Button
              style={[styles.button]}
              // onPress={this._search.bind(this)}
              title="Search"
              color="#ed2024"
            /> */}
            <TouchableOpacity onPress={this._search} style={styles.searchButton}>
              <Text style={styles.helpLinkText}>Search</Text>
            </TouchableOpacity>
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
    search: state.search
  };
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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
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
