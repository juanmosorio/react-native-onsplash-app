import React from 'react';
import { FlatList } from 'react-native';
import Galery from '../components/galery';

import { connect } from 'react-redux';

class GaleryList extends React.Component {

	_keyExtractor = item => item.id.toString();

	_renderGalery = ({ item }) => <Galery { ...item } />;

	render = () => (
		<FlatList
			data={this.props.photosList}
	    renderItem={this._renderGalery}
	    keyExtractor = {this._keyExtractor}
	    onEndReachedThreshold={0.5}
	    onEndReached={() => console.warn('ENd')}
		/>
	);

}

const mapSateToProps = (state) => {
	return {
		photosList: state.photos.photosList
	};
}

export default connect(mapSateToProps)(GaleryList);