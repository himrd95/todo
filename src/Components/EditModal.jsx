import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AlertDialog({label, value, handleChange, name, index, handleSuccessMessage}) {
    const [open, setOpen] = React.useState(false);
    const [newChanges, setNewChanges] = React.useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        if (newChanges !== "") {
          setOpen(false);
          handleChange(newChanges, name, index)
          handleSuccessMessage()
        } else {
          alert("Please type something.")
        }
      };

  return (
    <div>
        <div onClick={handleClickOpen}>
        {label}
      </div>
      <Dialog
        open={open}
        onClose={()=>setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{value}</DialogTitle>
        <DialogContent style={{margin:'auto'}}>
            <TextField value={newChanges} onChange={(e)=>setNewChanges(e.target.value)} />
        </DialogContent>
        <DialogActions>
          
          <Button onClick={()=>handleClose()} color="primary" autoFocus>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
