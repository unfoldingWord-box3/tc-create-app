/**
 * ReleasePicker component
 * 
 * Browse releases for a given source repo.
 * Emphasis on changes related to a given target file.
 * 
 * Templates!
 *  https://github.com/mui-org/material-ui/tree/master/docs/src/pages/getting-started/templates
 * 
 *  https://material-ui.com/getting-started/templates/
 * 
 **/

import React, { useEffect, useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogActions,
  List, Modal,
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AssignmentIcon from '@material-ui/icons/Assignment';
import StarsIcon from '@material-ui/icons/Stars';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';

import ColumnGridlayout from '../easyGridLayout/columnGridLayout';
import RowGridLayout from '../easyGridLayout/rowGridLayout';

import { markdownToHtml } from '../../_imports/markdown-translatable/markdown-converter';

import mocks from '../../_mocks/index';

function ReleasePicker({
  sourceRepository,
  isOpen,
  classes,
}) {
  const [isModalOpen, setIsModalVisible] = useState(isOpen && isOpen==true);

  const [releases, setReleases] = React.useState([]);
  const [selectedRelease, setSelectedRelease] = React.useState();

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  
  useEffect(() => {
    async function fetchReleaseData() {
      const result = await (mocks.dcs.repos.unfoldingWord_en_tn());
      setReleases(result.api);
    };
    fetchReleaseData();
  }, [sourceRepository])

  useEffect(() => {
    if (releases && releases[0] && !selectedRelease)
    {
      setSelectedRelease(releases[0]);
    }
  }, [releases])

  const releasesListItems = releases.map(release => {return (
    <ListItem button key={release.id} onClick={()=> setSelectedRelease(release)}>
      <ListItemIcon>
        {
          (release.name == "Version 45")? <StarsIcon color="primary"/> : <AssignmentIcon />
        }
      </ListItemIcon>
      <ListItemText 
        primary={release.name} 
        secondary={
          (release.name == "Version 45")? "Default Source" : (new Date(release.created_at)).toLocaleDateString()
        } />
    </ListItem>
  )});

  const detailsPanel = useMemo(() => {
    if (selectedRelease?.body)
    {
      return (<>
        <Paper className={classes.scrollablePaper}>
          <h2>{selectedRelease?.name}</h2>
          <h3><Typography color="textSecondary">{(new Date(selectedRelease?.created_at)).toLocaleDateString()}</Typography></h3>
          <hr/>
          <div dangerouslySetInnerHTML={{ __html: markdownToHtml({ markdown: selectedRelease?.body }) }}/>
        </Paper>
      </>);
    }
  }, [selectedRelease]);

  const content = useMemo(()=> {
    const versionListPanel = (<>
      <List className={classes.scrollableList}>{releasesListItems}</List>
    </>);

    return (
      <RowGridLayout
        leftComponent={versionListPanel}
        contentComponent={detailsPanel || <Typography/>}
        rightComponent={null}
      />
    );
  }, [detailsPanel, classes]);

  const modal = useMemo(() => {
    return (
      <Dialog fullWidth={true} maxWidth='xl' open={isModalOpen} classes={{ paper: classes.dialogPaper }}>
        <ColumnGridlayout
          headerComponent={
            <Grid container direction="row" justify="space-between" width="100%">
              <Grid item>
                Select Source Version to Compare
              </Grid>
              <Grid item>
                <Button onClick={() => setIsModalVisible(false)}>
                    <CancelIcon color="action"/>
                </Button>
              </Grid>
            </Grid>
          }
          contentComponent={
            content
          }
          footerComponent={
            <div align="right">
              <Button variant="contained" color="primary">Select Version</Button>
            </div>
          }
        />
      </Dialog>
    );
  }, [isModalOpen, content]);

  return (
    <>
      <Button variant="contained" color="primary" onClick={() => setIsModalVisible(true)}>...</Button>
      {modal}
    </>
  );
};

// TODO: no proptypes in POC ?
// TODO: use typescript instead ?

// ReleasePicker.propTypes = {
//   /** @ignore */
//   classes: PropTypes.object.isRequired,
// };

const styles = theme => ({
  root: {
  },
  dialogPaper: {
    maxHeight: '100%',
  },
});

export default withStyles(styles)(ReleasePicker);