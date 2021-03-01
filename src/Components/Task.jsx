/* eslint-disable no-sequences */
import React, { useEffect } from 'react'
import "./Styling/Task.css"
import AlertDialog from './EditModal'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { editTodo, getTodo, updateTodo } from '../Redux/app/action';
import { Button, Dialog, DialogActions, DialogTitle, Grid, Paper, Slide, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  });


const Task = () => {
    const dispatch = useDispatch();
    const todo = useSelector(state => state.app.todo)
    // const isError = useSelector(state => state.app.isError);
    // const isLoading = useSelector(state => state.app.isLoading);
    const id = +useParams().id;
    const [open, setOpen] = React.useState(false);
    const [openConfirmation, setOpenConfirmation] = React.useState(false);
    const [message, setMessage] = React.useState("")
    const auth = useSelector(state => state.auth.auth)
    const [deleteId, SetDeleteId] = React.useState(0)
    

    useEffect(() => {
        dispatch(getTodo())
    }, [dispatch])

    const statusHandler = () => {
        const temp = [...todo];
        const updated = temp.find(item => item.id === id);
        updated.status = !updated.status
        dispatch(updateTodo(updated.status, id))
    }

    const handleChange = (value, name, index) => {
        const temp = [...todo];
        const updated = temp.find(item => item.id === id);
        updated.subtask[+index] = value;
        let val
        name === "subtask" ? val = updated.subtask : val = value;
        console.log(val)
        dispatch(editTodo(name, val, id))

        setMessage(`Your ${name} was updated!`)
    }

    const handleOpenDelete = (i) => {
        setOpenConfirmation(true)
        SetDeleteId(+i)
    }
    const handleDelete = () => {
        const temp = [...todo];
        const updated = temp.find(item => item.id === id);
        console.log(updated.subtask, deleteId)
        updated.subtask.splice(deleteId, 1)
        const name = "subtask"
        const val = updated.subtask
        dispatch(editTodo(name, val, deleteId))
        setMessage("Your Sub-task was deleted!")
        setOpenConfirmation(false)
        setOpen(true)
    }

    const handleAdd = (val, name, index) => {
        const temp = [...todo];
        const updated = temp.find(item => item.id === id);
        console.log(updated.subtask)
        const array = updated.subtask
        array.push(val);
        console.log(updated.subtask, val)
        dispatch(editTodo(name, array, id))
        setMessage("Your Sub-task was added!")
    }
    
    const handleSuccessMessage = () => {
        setOpen(true)
    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        setOpenConfirmation(false)
    };
    return (
        <div>
            {!auth ? <h2 style={{color:'white'}}>404 Error: Page not found</h2> : todo?.filter(item => item.id === id).map((item) => (
                <div>
                    <Paper className="header">
                        <div className="date">{item.date}</div>
                        <div style={{ color: `${item.status ? 'green' : 'orange'}`, cursor:'pointer' }}
                            onClick={statusHandler}
                        >
                            {item.status ? "Completed" : "Pending"}
                        </div>
                        <div style={{display:'flex'}}>
                            <div className="tag">{item.personal && "Personal" }</div>
                            <div className="tag"> { item.official && "Official"}</div>
                            <div className="tag"> {item.other && "Other"}</div>
                        </div>
                    </Paper>

                    <Grid className="taskTitle">
                        <h1 style={{textDecoration:`${item.status ? "line-through" : "none"} `}}>{item.title}</h1>
                        <Paper style={{ padding: '5px 10px' }} className="subtaskEditor">
                            <AlertDialog label={"Edit"}
                                value={`Previouse Text was: [ ${item.title} ]`}
                                name="title"
                                handleChange={handleChange}
                                handleSuccessMessage={handleSuccessMessage}
                            />
                        </Paper>
                    </Grid>
                    <div className="taskTitle">
                        <p style={{textDecoration:`${item.status ? "line-through" : "none"} `}} className="des">{item.des}</p>
                        <Paper style={{ padding: '5px 10px' }} className="subtaskEditor">
                            <AlertDialog label={"Edit"} value={ `Previouse Text was: [ ${item.des} ]`}
                                name="des"
                                handleChange={handleChange}
                                handleSuccessMessage={handleSuccessMessage}
                            />
                        </Paper>
                    </div>

                    <fieldset className="fieldset">
                        <legend style={{color:'white', fontSize:'20px'}}>Sub Tasks</legend>
                        {item.subtask?.map((sTask, index) => (
                            <div className='sub-task' key={index}>
                                <div><i class="far fa-check-square"></i></div>
                                <div style={{textDecoration:`${item.status ? "line-through" : "none"} `}}>{sTask}</div>
                                <Paper style={{background:'white'}} className="subtaskEditor">
                                    <AlertDialog label={"Edit"} value={`Previouse Text was: [ ${sTask} ]`}
                                        index={index} name="subtask"
                                        handleChange={handleChange}
                                        handleSuccessMessage={handleSuccessMessage}
                                    />
                                    {/* <i class="fas fa-check-circle"></i> */}
                                    <i onClick={()=>handleOpenDelete(index)} class="fas fa-trash-alt"></i>
                                    <Dialog
                                        open={openConfirmation}
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
                                        <Button onClick={() => handleDelete(index)} color="primary">
                                            YES
                                        </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Paper>
                            </div>
                        ))}
                    </fieldset>
                </div>
            ))}
            <div className="add-Button">
                <AlertDialog label={"Add New Sub-Task"} value="Type new Sub-Task"
                    name="subtask"
                    handleChange={handleAdd}
                    handleSuccessMessage={handleSuccessMessage}
                />
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert style={{ background: 'green', color: 'white' }}
                    onClose={handleClose} severity="success">
                    {message}
                </Alert>
            </Snackbar>
            
        </div>
    )
}

export default Task
