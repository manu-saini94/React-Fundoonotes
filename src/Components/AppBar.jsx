import React, { Component } from 'react'
import { Card, InputBase, Tooltip, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import "./App&SideNav.css";
import SettingsIcon from '@material-ui/icons/Settings';
import RefreshIcon from '@material-ui/icons/Refresh';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import AppsIcon from '@material-ui/icons/Apps';
import MenuIcon from '@material-ui/icons/Menu';


class AppNavBar extends Component {
    render(props) {
        return (
            <div className='App_Nav'>
                <Card className="App_Card">
                    <div className="Base_Input">
                        <div className="Menu_Icon">
                            <Tooltip title="Main Menu">
                                <IconButton onClick={this.props.sideopen}>
                                    <MenuIcon />

                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className="Icon_Image">
                            <img id="image_logo" alt="App_Logo" style={{ fontSize: 1 }}
                                src="https://www.gstatic.com/images/branding/product/1x/keep_48dp.png" />

                        </div>
                        <div className="App_Name">
                            <h4>Keep</h4>

                        </div>
                        <Card className="Search_Card">
                            <div className></div>
                        </Card>
                    </div>
                </Card>
            </div>
        )
    }
}

export default AppNavBar
