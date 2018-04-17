import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

// import App from './components/app';
import reducers from './reducers';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const createStoreWithMiddleware = applyMiddleware()(createStore);

const API_KEY = 'AIzaSyDEylBuhS8PMiKaMeSeDtk8mMrmdrpcA30';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    YTSearch({key: API_KEY, term: 'jump parachute'}, (videos) => {
      this.setState({ 
        videos: videos,
        selectedVideo: videos[0]
      });
      
      
    });
  }

  render() {
    return (
      <div>
        <SearchBar />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList 
          onVideoSelect={selectedVideo => this.setState({selectedVideo})}
          videos={this.state.videos} />
      </div>
    );
  };
}


ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <App />
  </Provider>
  , document.querySelector('.container'));



