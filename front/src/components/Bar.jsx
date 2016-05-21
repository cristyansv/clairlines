import React from 'react';
import AppBar from 'material-ui/AppBar';


var Style ={
    backgroundColor: 'RGBA(0,0,0,0.3)'
};

const Bar = () => (
    <AppBar
        style={Style}
        title="CL Airlines"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
    />
);

export default Bar;