import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from '../Redux/app/action';
// import {changeTheme} from '../Redux/app/action'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
    const dispatch = useDispatch();
    const theme = useSelector(state => state.app.theme)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

    const handleClose = (event, num) => {
        const temp = [...theme];
        const updated = temp.find((item, index) => index === num)
        console.log(updated, num)
    dispatch(changeTheme(updated))
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      
      <div>
        <Button
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle} style={{color:'black'}}
        >
          THEME
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(e)=>handleClose(e, 0)}>Rose</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 1)}>office Evvironment</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 2)}>Slate</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 3)}>Marsala</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 4)}>Aloy</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 5)}>Nebula</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 6)}>Modern Flat</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 7)}>Branches</MenuItem>
                    <MenuItem onClick={(e)=>handleClose(e, 8)}>Paradise</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}