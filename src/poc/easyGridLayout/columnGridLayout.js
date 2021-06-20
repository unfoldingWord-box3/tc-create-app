import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CancelIcon from '@material-ui/icons/Cancel';
import { BottomNavigation, Button } from '@material-ui/core';


export default function ColumnGridlayout({
  headerComponent,
  contentComponent,
  footerComponent,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.gridColumnsLayoutContainer}>
        <div className={classes.gridColumnsLayoutHeader}>
            {headerComponent}
        </div>
        <div className={classes.gridColumnsLayoutBody}>
            {contentComponent}
        </div>
        <div className={classes.gridColumnsLayoutFooter}>
            {footerComponent}
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

  gridColumnsLayoutContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100vw',
    height: '100%',
  },
  gridColumnsLayoutHeader: {
    flex: 'none',
    margin: '12pt',
  },
  gridColumnsLayoutBody: {
    flex: 1,
  },
  gridColumnsLayoutFooter: {
    flex: 'none',
    padding: '12pt',
  },
}));