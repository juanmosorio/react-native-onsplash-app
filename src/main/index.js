import { connect } from 'react-redux';
import { createReduxContainer } from 'react-navigation-redux-helpers';

import AppNavigator from './navigation';

const ReduxifyApp = createReduxContainer(AppNavigator);

const mapStateToProps = state => {
  return { state: state.navigation }
};

export default connect(mapStateToProps)(ReduxifyApp);
