  
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Overview from '../pages/overview';
import SourceSetup from '../pages/sourcesetup';
import DistributionSetup from '../pages/distributionsetup';


const AllRoutes = () => {
	return (
		<Switch >
            <Route exact path = '/' component = { Overview } />
            <Route exact path = '/sources/:id' component = { SourceSetup } />
            <Route exact path = '/sources' component = { SourceSetup } />
            <Route exact path = '/distribution' component = { DistributionSetup } />

        </Switch>
		)
};

export default AllRoutes;
