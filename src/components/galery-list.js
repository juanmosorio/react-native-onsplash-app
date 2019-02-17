import React from 'react';
import { FlatList } from 'react-native';
import Galery from './galery';


const _keyExtractor = item => item.id.toString();

const _renderGalery = ({ item }) => (
	<Galery { ...item } />
);

const GaleryList = ({ photos }) =>  (
	<FlatList
		data={photos}
    renderItem={_renderGalery}
    keyExtractor = {_keyExtractor}
	/>
);

export default GaleryList;