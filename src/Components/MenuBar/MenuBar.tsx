import React, { useState } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useUserContext } from '../../Context/UserContext';

function MenuBar() {
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const { user } = useUserContext();
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
          {!user && (
            <Tab
              label="Login"
              component={Link}
              to="/Login"
              style={{ color: 'inherit' }}
            />
          )}
          {!user && (
            <Tab
              label="Register"
              component={Link}
              to="/Register"
              style={{ color: 'inherit' }}
            />
          )}
          {user && (
            <Tab
              label="List"
              component={Link}
              to="/List"
              style={{ color: 'inherit' }}
            />
          )}
          {user && (
            <Tab
              label="Cart"
              component={Link}
              to="/Cart"
              style={{ color: 'inherit' }}
            />
          )}
          {user && (
            <Tab
              label="Profile"
              component={Link}
              to="/Profile"
              style={{ color: 'inherit' }}
            />
          )}
        </Tabs>
      </Toolbar>
    </AppBar>
  );
}

export default MenuBar;
