import React, {useMemo} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems';
import Deposits from './Deposits';
import Orders from './Orders';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

import { Button } from '@material-ui/core';
import { markdownToHtml } from '../../_imports/markdown-translatable/markdown-converter';

import mocks from '../../_mocks/index';

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [selectedRelease, setSelectedRelease] = React.useState();

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleModalClose = () => {
    setOpen(false);
  };

  console.log("Dashboard // mocks", mocks);
  
  const releases = mocks.dcs.repos.unfoldingWord_en_tn.api;
  console.log("Dashboard // releases", releases);
  const releasesListItems = releases.map(release => {return (
    <ListItem button key={release.id} onClick={()=> setSelectedRelease(release)}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary={release.name} secondary={(new Date(release.created_at)).toLocaleDateString()} />
    </ListItem>
  )});

  const versionListPanel = (<>
    <List className={classes.scrollableList}>{releasesListItems}</List>
  </>);

  const detailsPanel = useMemo(() => {
    if (selectedRelease?.body)
    {
      return(<>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.paper}>xs=6</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>xs=3</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div dangerouslySetInnerHTML={{ __html: markdownToHtml({ markdown: selectedRelease?.body }) }} />
            </Paper>
          </Grid>
        </Grid>
    </>)
    }
  }, [selectedRelease]);

  // return (<div className={classes.root}>
  //   {versionListPanel}
  // </div>);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Paper className={classes.scrollableListPaper} style={{ float: 'left' }}>
        {versionListPanel}
      </Paper>
      <Container className={classes.paper}>
        {detailsPanel || <Typography/>}
      </Container>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 'inherit'
  },
  container: {
    maxHeight: 'inherit',
    overflow: 'auto',
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    overflow: 'auto',
  },
  scrollableList: {
    // DEBUG: TODO:
    maxHeight: 'inherit',
    overflow: 'auto',
    paddingRight: '16pt',
  },
  scrollableListPaper: {
    // DEBUG: TODO:
    maxHeight: 'inherit',
    overflow: 'auto',
  },
}));