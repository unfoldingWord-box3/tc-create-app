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

import React, { useMemo, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  Button,
  DialogActions,
  List, Modal,
} from '@material-ui/core';

import Dashboard from './Dashboard';

import mocks from '../../_mocks/index';
import Dialog from '@material-ui/core/Dialog';

function ReleasePicker({
  classes,
}) {

  const [isModalOpen, setIsModalVisible] = useState(true);

  const modal = useMemo(() => {
    return (
      <Dialog fullWidth={true} maxWidth='xl' open={isModalOpen} classes={{ paper: classes.dialogPaper }}>
        <Dashboard/>
      </Dialog>
    );
  }, [isModalOpen]);

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
      minHeight: '80vh',
      maxHeight: '80vh',
  },
});

export default withStyles(styles)(ReleasePicker);