import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';
import { BottomNavigation, Button } from '@material-ui/core';


export default function RowGridLayout({
  leftComponent,
  contentComponent,
  rightComponent,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.gridRowsLayoutContainer}>
        <div className={classes.gridRowsLayoutLeft}>
          <div className={classes.scrollablePaper}>
            {leftComponent}
          </div>
        </div>
        <div className={classes.gridRowsLayoutBody}>
          <div className={classes.scrollablePaper}>
            {contentComponent}
          </div>
        </div>
        <div className={classes.gridRowsLayoutRight} style={!rightComponent?{display: 'none'}:{}}>
            {rightComponent}
        </div>
      </div>
    </div>
  );

};

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100%',
  },
  
  gridRowsLayoutContainer: {
    display: 'flex',
    flexDirection: 'row',
    height: '100%',
    maxHeight: '80vh',
    width: '100%',
    maxWidth: '100vw',
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
  
  scrollablePaper: {
    height: '100%',
    maxHeight: '100%',
    width: '100%',
    maxWidth: '100vw',
    overflow: 'auto',
  },
}));