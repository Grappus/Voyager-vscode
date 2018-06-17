import React from 'react';
import Dependencies from '../components/Dependencies/Dependencies'
import packageService from '../services/package.service';
import List from '../components/List/List'
import Scripts from '../components/Scripts/Scripts'

const Tabs = {
	dependencies: <Dependencies dependencies={packageService.getDependencies()}/>,
    devDependencies: <Dependencies dependencies={packageService.getDevDependencies()}/>,
    info: <List items={packageService.getInfo()} />,
    scripts: <Scripts items={packageService.getScripts()} />,
};

export default Tabs;