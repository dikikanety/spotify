import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import axios from '../../../axios';
import '../styles/_discover.scss';


export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      isLoading: true,
    };
  }

  async getDiscoverData() {  
    try {
      const [newReleasesResponse, playlistsResponse, categoriesResponse] = await Promise.all([
        axios.get('/browse/new-releases'),
        axios.get('/browse/featured-playlists'),
        axios.get('/browse/categories')
      ]);
      const newReleasesData = newReleasesResponse.data.albums.items;
      const playlistsData = playlistsResponse.data.playlists.items;
      const categoriesData = categoriesResponse.data.categories.items
   
      this.setState({
        newReleases: newReleasesData,
        playlists: playlistsData,
        categories: categoriesData,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
      this.setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  componentDidMount() {
    this.getDiscoverData();
  }

  render() {
    const { newReleases, playlists, categories, isLoading } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock 
          text="RELEASED THIS WEEK" 
          id="released" 
          data={newReleases} 
          isLoading={isLoading} 
        />
        <DiscoverBlock 
          text="FEATURED PLAYLISTS" 
          id="featured" 
          data={playlists} 
          isLoading={isLoading} 
        />
        <DiscoverBlock 
          text="BROWSE" 
          id="browse" 
          data={categories} 
          imagesKey="icons" 
          isLoading={isLoading} 
        />
      </div>
    );
  }
}
