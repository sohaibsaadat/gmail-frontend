import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import RefreshIcon from '@mui/icons-material/Refresh';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import Inbox from '../pages/Inbox';
import { Outlet } from "react-router-dom";
import AllMail from '../pages/AllMail';
import Draft from '../pages/Draft';
import Sent from '../pages/Sent';
import Starred from '../pages/Starred'
import Trash from '../pages/Trash';
import { Link, Route, Routes } from "react-router-dom";
import StarBorderPurple500OutlinedIcon from '@mui/icons-material/StarBorderPurple500Outlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import MarkAsUnreadOutlinedIcon from '@mui/icons-material/MarkAsUnreadOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Checkbox,
  IconButton,
  Menu,
  
} from "@mui/material";
const label = { slotProps: { input: { 'aria-label': 'Checkbox demo' } } };


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function Layout({open,children,setOpen}) {
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
  { text: "Inbox", icon: <InboxIcon />, path: "/" },
  { text: "Starred", icon: <StarBorderPurple500OutlinedIcon />, path: "/starred" },
  { text: "Send Email", icon: <SendOutlinedIcon />, path: "/sent" },
  { text: "Drafts", icon: <NoteOutlinedIcon />, path: "/drafts" },
  { text: "All Mail", icon: <MarkAsUnreadOutlinedIcon />, path: "/all-mail" },
  { text: "Trash", icon: <DeleteOutlinedIcon />, path: "/trash" },
];


const [checked, setChecked] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const start = Boolean(anchorEl);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar   sx={{
    backgroundColor: "#fff",
  }} className='bg-white' position="fixed" open={open}>
        <Toolbar className='justify-between'>
            <div className='flex items-center'>
 <IconButton
            color="#000"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 1,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
         <img className='w-25 ml-1' src="/public/gmail.jpg" alt="" />
            </div>
         
         <div className='min-h-12 ml-20 min-w-150 flex justify-between items-center px-2 border-gray-400  shadow-xs         rounded-full bg-gray-200'>
<SearchIcon sx={{fontSize:40}}   className='text-gray-500 rounded-full p-2 hover:bg-gray-300 cursor-pointer '/>
            <input placeholder='Search Mail' className='w-full h-12 rounded-full text-black px-1 text-md focus:outline-0 font-light' type="text" name="" id="" />
         </div>
         <div className='flex items-center gap-8 '>
<HelpOutlineOutlinedIcon sx={{fontSize:40}} className='text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full  p-2'/>
<SettingsOutlinedIcon sx={{fontSize:40}} className='text-gray-600 hover:bg-gray-200 cursor-pointer rounded-full  p-2'/>
<img className='w-8' src="/gemini-color.svg" alt="" />
         </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
       
       <List>
  {menuItems.map((item) => (
    <ListItem key={item.text} disablePadding sx={{ display: "block" }}>
      <ListItemButton
        component={Link}
        to={item.path}
        sx={[
          {
            minHeight: 48,
            px: 2.5,
            textDecoration: "none",
            color: "inherit",
          },
          open
            ? { justifyContent: "initial" }
            : { justifyContent: "center" },
        ]}
      >
        <ListItemIcon
          sx={[
            {
              minWidth: 0,
              justifyContent: "center",
            },
            open ? { mr: 3 } : { mr: "auto" },
          ]}
        >
          {item.icon}
        </ListItemIcon>

        <ListItemText
          primary={item.text}
          sx={[
            open ? { opacity: 1 } : { opacity: 0 },
          ]}
        />
      </ListItemButton>
    </ListItem>
  ))}
</List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />
         <div className="flex items-center">
      <Checkbox
        checked={checked}
        onChange={() => setChecked((prev) => !prev)}
      />

      <IconButton
        size="small"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <ArrowDropDownIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={start}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>
          Select all
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          Select none
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          Read
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          Unread
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          Starred
        </MenuItem>

        <MenuItem onClick={() => setAnchorEl(null)}>
          Unstarred
        </MenuItem>
      </Menu>
      <RefreshIcon sx={{fontSize:35}} className='rounded-full hover:bg-gray-200 scale- p-2'/>
<MoreVertIcon sx={{fontSize:35}} className='rounded-full hover:bg-gray-200 scale- p-2' />
    </div>
  
              {children}

      </Box>
    </Box>
  );
}
