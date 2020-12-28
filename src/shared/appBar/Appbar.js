import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import './AppBar.css';
import Search from '../search/Search';
import LeftDrawer from '../drawer/Drawer';


export default function CargoAppBar({
   onLoadCompanies,
   handleSearchChange,
   searchTerm,
   handleKeyPress,
   companyList,
   openCompanyDetails,
   onSaveCompanies
  }) {

  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);   
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
        <IconButton
         onClick={handleDrawerToggle}
         edge="start"
         color="inherit"
         aria-label="menu">
         <MenuIcon />
         </IconButton>
          {open && <LeftDrawer
           handleDrawerToggle={handleDrawerToggle}
           open={open}
           companyList={companyList}
           openCompanyDetails={openCompanyDetails}
           searchTerm={searchTerm}
           handleSearchChange={handleSearchChange}
           handleKeyPress={handleKeyPress}
           onLoadCompanies={onLoadCompanies}
           />}
          <Typography variant="h6" noWrap className="title">
            Cargo Planner
          </Typography>
          <div className="searchInput">
          <Search
            handleSearchChange={handleSearchChange}
            searchTerm={searchTerm}
            handleKeyPress={handleKeyPress}
           />
           </div>
           <div className="spacer" ></div>
           <Button id="loadButton" style={{color: "white"}} onClick={onLoadCompanies}> Load </Button>
           <Button id="saveButton" style={{color: "white"}} onClick={onSaveCompanies}> Save </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
