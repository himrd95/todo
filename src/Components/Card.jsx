/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
import { Button, Dialog } from '@material-ui/core'
import React from 'react'
import "./Styling/Card.css"
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useHistory } from 'react-router';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  });

export const Card = (props) => {
    const [open, setOpen] = React.useState(false);

    const clickOPenHAndler = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const history = useHistory();
    const handleTaskPage = () => {
        history.push(`task/${props.id}`)
    }
    return (
        <div className="cards" key={props.id}>
            <div className="top">
                <div>{props.date}</div>
                <button className='statusBtn'
                    onClick={()=>props.statusHandler(props.id)}
                    style={{ color: `${props.status ? 'green' : 'orange'}`, cursor:'pointer' }}
                >
                    <i class="fas fa-check-circle"></i>
                </button>
                <button className="deleteBtn"
                    
                    onClick={()=>clickOPenHAndler()}
                >
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
            <div onClick={()=>handleTaskPage(props.id)}>
                <div className="title">{`${props.title}`}</div>
                <div style={{display:'flex', justifyContent:'space-between', fontWeight: '500'}}>
                    <div>{props.personal && "Personal" }</div>
                    <div>{ props.official && "Official"}</div>
                    <div>{ props.other && "Other"}</div>
                </div>
                <p className="description">{ props.des}</p>
                <div>
                    {props.subtask?.map((item, index) => (
                        <div className='subtask' key={index}>
                            <button><i class="far fa-check-square"></i></button>
                            <div>{item}</div>
                        </div>
                    ))}
                </div>
            </div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Do you really want to delete your task?"}</DialogTitle>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    NO
                </Button>
                <Button onClick={() => props.deleteHandler(props.id)} color="primary">
                    YES
                </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
