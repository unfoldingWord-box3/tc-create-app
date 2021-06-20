import React, { useContext, useMemo, useState, useCallback, lazy } from 'react';
import { FileContext } from 'gitea-react-toolkit';
import { ApplicationStepper,  } from './components';
//import { Translatable } from './components';
import { AppContext } from './App.context';
import { TargetFileContextProvider } from './core/TargetFile.context';
import { Typography, Link } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { onOpenValidation } from './core/onOpenValidations';

import ReleasePicker from './poc/catalog-next/ReleasePicker';
import ColumnGridlayout from './poc/easyGridLayout/columnGridLayout';
import RowGridLayout from './poc/easyGridLayout/rowGridLayout';

function Workspace() {
  // this state manage on open validation 
  const [criticalErrors, setCriticalErrors] = useState([]);

  const { 
    state: { sourceRepository, filepath }, 
    actions: { setSourceRepository} 
  } = useContext(AppContext);
  // note: in above I tried to use setFilepath for use in the Alert
  // onClose() below, but did not work. However, setSourceRepository does
  const { state: sourceFile } = useContext(FileContext);

  const sourceRepoMemo = sourceRepository && JSON.stringify(sourceRepository);
  const sourceFilepath = sourceFile && sourceFile.filepath;
  const handleClose = useCallback( () => {
    setCriticalErrors([]);
    setSourceRepository(undefined);
  }, [setCriticalErrors, setSourceRepository]);

  const _onOpenValidation = (filename,content,url) => {
    const notices = onOpenValidation(filename, content, url);
    if (notices.length > 0) {
      setCriticalErrors(notices);
    } else {
      setCriticalErrors([]);
    }
    return notices;
  }

  const component = useMemo(() => {
    let _component = <ApplicationStepper />;

    if (sourceRepoMemo && sourceFilepath && filepath) {
      if (sourceFilepath === filepath) {
        // TODO: can we dynamically load components?
        //const ReleasePicker = require('./poc/catalog-next/ReleasePicker.js'); 
        // --- OR ---
        // <div>
        // {
        //   lazy(() =>
        //     import(`./poc/catalog-next/ReleasePicker.js`).catch(() =>
        //       <div>Error loading component!</div>
        //   ))
        // }

        // <ReleasePicker sourceRepository={sourceRepository} /> 

        /*
          <ColumnGridlayout 
            headerComponent = {<div>headerComponent</div>}
            contentComponent = {<div>contentComponentcontentComponent</div>}
            footerComponent = {<div>footerComponent</div>}
          />
        */

        /*
          <RowGridLayout
            leftComponent = {<div>leftComponent</div>}
            contentComponent = {<div>contentComponentcontentComponent</div>}
            rightComponent = {<div>rightComponent</div>}
          />
        */

        _component = (
          <ReleasePicker sourceRepository={sourceRepository} isOpen={true} />
        );
      }
    }
    return _component;
  }, [sourceRepoMemo, sourceFilepath, filepath, criticalErrors, handleClose]);

  return component;
}

export default Workspace;
