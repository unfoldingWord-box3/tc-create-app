import React, { useContext, useMemo, useState, useCallback } from 'react';
import { FileContext } from 'gitea-react-toolkit';
import { ApplicationStepper, Translatable } from './components/';
import { AppContext } from './App.context';
import { TargetFileContextProvider } from './core/TargetFile.context';
import { Typography, Link } from '@material-ui/core';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

function Workspace() {
  const [validated, setValidated] = useState(false);
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

  const component = useMemo(() => {
    let _component = <ApplicationStepper />;

    if (sourceRepoMemo && sourceFilepath && filepath) {
      if (sourceFilepath === filepath) {
        _component = (
          <TargetFileContextProvider 
            validated={validated} onValidated={setValidated} 
            onCriticalErrors={setCriticalErrors}
          >
            {
              (validated && <Translatable />) 
              || 
              (criticalErrors.length > 0 && 
                <Dialog
                  disableBackdropClick
                  open={!validated}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                  This file cannot be opened by tC Create. Please contact your administrator to address the following error(s).
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    {
                      criticalErrors.map( (msg,idx) => {
                        return (
                          <>
                          <Typography key={idx}>
                            On <Link href={msg[0]} target="_blank" rel="noopener">
                              line {msg[1]}
                            </Link>
                            &nbsp;{msg[2]}&nbsp;{msg[3]}&nbsp;{msg[4]}&nbsp;{msg[5]}
                          </Typography>
                          </>
                        )
                    })}
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Close
                    </Button>
                  </DialogActions>
                </Dialog>
              )
            }
          </TargetFileContextProvider>
        );
      }
    }
    return _component;
  }, [sourceRepoMemo, sourceFilepath, filepath, validated, criticalErrors, handleClose]);

  return component;
}

export default Workspace;
