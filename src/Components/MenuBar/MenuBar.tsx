import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function MenuBar() {
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">My App</Typography>
        <Tabs
          value={selectedTab}
          onChange={(_, value) => setSelectedTab(value)}
        >
          <Tab
            label="Home"
            component={Link}
            to="/"
            style={{ color: 'inherit' }}
          />
          <Tab
            label="List"
            component={Link}
            to="/List"
            style={{ color: 'inherit' }}
          />
          <Tab
            label="Login"
            component={Link}
            to="/Login"
            style={{ color: 'inherit' }}
          />
          <Tab
            label="Register"
            component={Link}
            to="/Register"
            style={{ color: 'inherit' }}
          />
          <Tab
            label="Cart"
            component={Link}
            to="/Cart"
            style={{ color: 'inherit' }}
          />
          <Tab
            label="Profile"
            component={Link}
            to="/Profile"
            style={{ color: 'inherit' }}
          />
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;
