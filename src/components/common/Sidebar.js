import React, { useState, useEffect } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Collapse,
  IconButton,
  Box,
  Typography,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorageIcon from '@mui/icons-material/Storage';

const Sidebar = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [openDropdown, setOpenDropdown] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const drawerWidth = isMinimized ? 70 : 240;

  const toggleSidebar = () => {
    setIsMinimized((prev) => !prev);
  };

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const navigateToPage = (path) => {
    navigate(path);
  };

  const menuItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />,
      subItems: [
        { label: 'Sub-item 1', path: '/dashboard/sub1' },
        { label: 'Sub-item 2', path: '/dashboard/sub2' },
        { label: 'Sub-item 3', path: '/dashboard/sub3' },
      ],
    },
    {
      label: 'Datastore',
      path: '/datastore',
      icon: <StorageIcon />,
    },
  ];

  useEffect(() => {
    if (isMinimized) {
      setOpenDropdown({});
    }
  }, [isMinimized]);

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        transition: 'width 0.3s ease',
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          backgroundColor: '#171717',
          color: '#fff',
          paddingTop: '10px',
          position: 'fixed',
          top: '70px',
          bottom: '50px',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          zIndex: '1300',
        },
      }}
      open={!isMinimized}
    >
      <List>
        {menuItems.map((item, index) => (
          <Box key={index}>
            <ListItem
              sx={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: location.pathname === item.path ? '#444' : 'transparent',
                '&:hover': {
                  backgroundColor: '#555',
                },
                transition: 'background-color 0.3s ease',
                cursor: 'pointer',
              }}
              onClick={() =>
                item.subItems ? toggleDropdown(index) : navigateToPage(item.path)
              }
            >
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSidebar();
                }}
                color="inherit"
                sx={{
                  padding: '8px',
                  backgroundColor: '#222',
                  borderRadius: '8px',
                  '&:hover': {
                    backgroundColor: '#555',
                  },
                }}
              >
                {item.icon}
              </IconButton>
              {!isMinimized && (
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '15px',
                    flexGrow: 1,
                    userSelect: 'none',
                    color: location.pathname === item.path ? '#4caf50' : '#fff',
                    transition: 'color 0.3s ease',
                    ml: 2,
                  }}
                >
                  {item.label}
                </Typography>
              )}
              {/* Only show expand/collapse icon if sidebar is not minimized */}
              {!isMinimized && item.subItems && (
                openDropdown[index] ? (
                  <ExpandLessIcon sx={{ color: '#fff' }} />
                ) : (
                  <ExpandMoreIcon sx={{ color: '#fff' }} />
                )
              )}
            </ListItem>

            {/* Collapse section for subitems */}
            {item.subItems && (
              <Collapse in={openDropdown[index]} timeout="auto" unmountOnExit>
                {item.subItems.map((subItem, subIndex) => (
                  <ListItem
                    key={subIndex}
                    button
                    sx={{
                      pl: isMinimized ? 4 : 6,
                      backgroundColor: location.pathname === subItem.path ? '#555' : 'transparent',
                      '&:hover': {
                        backgroundColor: '#666',
                      },
                    }}
                    onClick={() => navigateToPage(subItem.path)}
                  >
                    <ListItemText
                      primary={subItem.label}
                      sx={{
                        color: location.pathname === subItem.path ? '#4caf50' : '#fff',
                        transition: 'color 0.3s ease',
                        ml: isMinimized ? 0 : 2,
                      }}
                    />
                  </ListItem>
                ))}
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
