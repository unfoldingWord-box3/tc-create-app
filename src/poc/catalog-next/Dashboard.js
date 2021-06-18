import React, {useEffect, useMemo} from 'react';
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
import { BottomNavigation, Button } from '@material-ui/core';

import { Layout } from 'antd';

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

  useEffect(() => {
    if (releases && !selectedRelease)
    {
      setSelectedRelease(releases[0]);
    }
  }, [releases])

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
      return (<>
        <div className={classes.scrollablePaper} dangerouslySetInnerHTML={{ __html: markdownToHtml({ markdown: selectedRelease?.body }) }}/>
      </>);
    }
  }, [selectedRelease]);
  
  const { Header, Footer, Sider, Content } = Layout;

  return (
    <div className={classes.root}>
      <div className={classes.gridColumnsLayoutContainer}>
        <div className={classes.gridColumnsLayoutHeader}>
          head
        </div>
        <div className={classes.gridColumnsLayoutBody}>
          <div className={classes.root}>
            <div className={classes.gridRowsLayoutContainer}>
              <div className={classes.gridRowsLayoutLeft}>
                <div className={classes.scrollablePaper}>
                  {versionListPanel}
                </div>
              </div>
              <div className={classes.gridRowsLayoutBody}>
                <div className={classes.scrollablePaper}>
                  {detailsPanel || <Typography/>}
                </div>
              </div>
              <div className={classes.gridRowsLayoutRight} style={{display: 'none'}}>
                  &nbsp;
              </div>
            </div>
          </div>
        </div>
        <div className={classes.gridColumnsLayoutFooter}>
          <div align="right">
            <Button variant="contained" color="primary">Select Version 41</Button>
          </div>
        </div>
      </div>
    </div>
  )

};


  /*
  
    <div className={classes.root}>
      <div className={classes.gridRowsLayoutContainer}>
        <div className={classes.gridRowsLayoutLeft}>
          <div className={classes.scrollablePaper}>
            {versionListPanel}
          </div>
        </div>
        <div className={classes.gridRowsLayoutBody}>
          <div className={classes.scrollablePaper}>
            {detailsPanel || <Typography/>}
          </div>
        </div>
      </div>
    </div>
  */

    /*

  return (
    <div className={classes.root}>
      <div className={classes.gridRowsLayoutContainer}>
        <div className={classes.gridRowsLayoutHeader}>
          <div className={classes.scrollableListPaper}>
            {versionListPanel}
          </div>
        </div>
        <div className={classes.gridRowsLayoutBody}>
          {detailsPanel || <Typography/>}
        </div>
        <div className={classes.gridRowsLayoutFooter}>
          right
        </div>
      </div>
    </div>
  )

    <div className={classes.root}>
      <div className={classes.gridRowsLayoutContainer}>
        <div className={classes.gridRowsLayoutHeader}>
          <div className={classes.scrollableListPaper}>
            {versionListPanel}
          </div>
        </div>
        <div className={classes.gridRowsLayoutBody}>
          {detailsPanel || <Typography/>}
          body
        </div>
        <div className={classes.gridRowsLayoutFooter}>
          right
        </div>
      </div>
    </div>

    <div className={classes.root}>
      <Grid container spacing={0} className={classes.gridRowsLayoutContainer}>
        <Grid item className={classes.gridRowsLayoutHeader}>
          <div className={classes.scrollableListPaper}>
            {versionListPanel}
          </div>
        </Grid>
        <Grid item className={classes.gridRowsLayoutBody}>
          {detailsPanel || <Typography/>}
          </Grid>
          <Grid item className={classes.gridRowsLayoutFooter}>
            right
          </Grid>
        </Grid>
      </div>

      */

  /*


    <Grid container spacing={0} className={classes.gridColumnsLayoutContainer}>
    <Grid item className={classes.gridColumnsLayoutHeader}>
      top
    </Grid>
    <Grid item className={classes.gridColumnsLayoutBody}>
    </Grid>
    <Grid item className={classes.gridColumnsLayoutFooter}>
      <Button variant="contained" color="primary">Select Version 41</Button>
    </Grid>
  </Grid>

  */

/*
    <Grid container spacing={0} className={classes.gridColumnsLayoutContainer}>
      <Grid item className={classes.gridColumnsLayoutHeader}>
        top
      </Grid>
      <Grid item className={classes.gridColumnsLayoutBody}>
        body
      </Grid>
      <Grid item className={classes.gridColumnsLayoutFooter}>
        footer
      </Grid>
    </Grid>

    <div className={classes.gridLayoutContainer}>
      <div className={classes.gridLayoutHeader}>
        top
      </div>
      <div className={classes.gridLayoutBody}>
        body
      </div>
      <div className={classes.gridLayoutFooter}>
        footer
      </div>
    </div>

*/

/*
        <Paper className={classes.scrollableListPaper} style={{ float: 'left' }}>
          {versionListPanel}
        </Paper>
        <Container className={classes.paper}>
          {detailsPanel || <Typography/>}
        </Container>
*/

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: '100%',
  },

  gridColumnsLayoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '90vw',
  },
  gridColumnsLayoutHeader: {
    flex: 'none'
  },
  gridColumnsLayoutBody: {
    flex: 1,
  },
  gridColumnsLayoutFooter: {
    flex: 'none'
  },
  
  gridRowsLayoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '80vh',
  },
  gridRowsLayoutLeft: {
    flex: 'none',
    paddingRight: '16pt'
  },
  gridRowsLayoutBody: {
    flex: 1,
    marginLeft: '16pt',
  },
  gridRowsLayoutRight: {
    flex: 'none'
  },

  scrollableList: {
    // DEBUG: TODO:
    maxHeight: '100%',
    height: '100%',
  },
  scrollablePaper: {
    // DEBUG: TODO:
    maxHeight: '100%',
    height: '100%',
    overflow: 'auto',
  },
}));