import React,{useEffect} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs,Tab,Typography,Box }from '@material-ui/core';
import {Home} from '@material-ui/icons';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  bar:{
    display:'flex',
    flexDirection:'row',
    backgroundColor: '#efefef',
    boxShadow: 'none',
    paddingLeft:'.5em'
  },
  hometab:{
    backgroundColor: '#7b7c80',
    minWidth:'5em',
    color: 'white',
    borderRadius: '3px',
    border: '1px solid silver',
  },
  tab:{
    margin: '0.1em',
    minWidth: '6em',
    borderRadius: '3px',
    border: '1px solid silver',
    backgroundColor: '#e8e8e9'
  }
}));

const CategoriesTab=({categoriesName,handleFilterByCategoryName})=> {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  
  useEffect(() => {
    handleFilterByCategoryName('all')
  }, [categoriesName])

  const handleChange = (event, newValue) => {
    setValue(newValue); // async call 
    handleFilterByCategoryName(newValue===0 ? 'all' : categoriesName[newValue-1])
  
  };
  return (
    <div className={classes.root}>
      <AppBar position="static"  color="default" className={classes.bar}>
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab key={`tab_0`} label={<Home/>} {...a11yProps(0)} className={classes.hometab} />
          {
            categoriesName.map((categoryName,index) => (
              <Tab key={`tab_${index+1}`}  {...a11yProps(index+1)} label={categoryName} className={classes.tab} />
            ))
          }
         
        </Tabs>
      </AppBar>
    </div>
  );
}


export default CategoriesTab;