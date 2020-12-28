import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CompanyList from '../../CargoPlanner/components/companyList/CompanyList';
import Search from '../search/Search';

const drawerWidth = 240;const useStyles = makeStyles(theme => ({

    drawerList: {
      display: "flex",
      flexDirection: "column",
      textDecoration: "none",
      color: "black",
      marginLeft: "20px"
    },
    
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    closeMenuButton: {
      marginRight: 'auto',
      marginLeft: 0,
    },
    loadButton: {
      width: "56%",
      marginBottom: "10px",
      marginTop: "12px"
    },
    searchInput: {
      border: "1px solid black",
      width: "70%",
      borderRadius: "8px"
    }
  }));


export default function LeftDrawer({
     handleDrawerToggle,
     open,
     companyList,
     openCompanyDetails,
     handleSearchChange,
     searchTerm,
     handleKeyPress,
     onLoadCompanies
    }) {

  const classes = useStyles();
  const theme = useTheme();
    

  const drawer = (
    <div className={classes.drawerList}>
      <div className={classes.searchInput}>
        <Search
         handleSearchChange={handleSearchChange}
         handleKeyPress={handleKeyPress}
         searchTerm={searchTerm}
          />
      </div>
        <Button
         className={classes.loadButton}
         color="primary"
         size="small"
         variant="contained"
         onClick={onLoadCompanies}>
           Load
        </Button>
      <List  onClick={handleDrawerToggle}>
          <CompanyList companyList={companyList} openCompanyDetails={openCompanyDetails} />
      </List>
    </div>
  );
       
  return (
     <div>
        <nav className={classes.drawer}>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <IconButton onClick={handleDrawerToggle} className={classes.closeMenuButton}>
              <CloseIcon/>
            </IconButton>
            {drawer}
          </Drawer>
        </Hidden><Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <div className={classes.toolbar} />
            {drawer}
          </Drawer>  
        </Hidden>
      </nav>
      <div className={classes.content}>
        <div className={classes.toolbar} />
      </div>
    </div>
  );
}
      
  
