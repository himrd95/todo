/* eslint-disable react/jsx-no-duplicate-props */
import React, { useState } from 'react';
import { getTodo, postTodo } from '../Redux/app/action';
import { useDispatch, useSelector } from 'react-redux'
import "./Styling/Todo.css"
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      width: '30ch',
    },
  },
}));


const task = {
    title: "",
    des: "",
    date: "",
    official: false,
    personal: false,
    other: false,
}

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
const Todo = () => {
    const [details, setDetails] = useState(task);
    const [subtitle, setSubtitle] = useState('');
    const [subtask, setSubTask] = useState([]);
    const dispatch = useDispatch();
    const { title, des, date } = details;
    const [open, setOpen] = React.useState(false);
    const auth = useSelector(state => state.auth.auth)
    const [warning, setWarning] = React.useState(auth)
    const classes = useStyles();
    const history = useHistory();

    const changeHandler = (e) => {
        const { name, value, type, checked } = e.target;
        const val = (type === 'checkbox') ? checked : value
        setDetails({...details, [name]: val})
    }

    const SubTitleHandler = e => {
        const { value } = e.target;
        setSubtitle(value)
    }
    const handleAdd = () => {
        setSubTask([...subtask, subtitle]);
    }
    
    const handleSubmit = () => {
        if (auth) {
            const payload = {
                ...details,
                subtask: [...subtask]
            }
            const action = postTodo(payload);
            dispatch(action).then((res) => {
                if (res.success) {
                    getTodo();
                }
            })
            setOpen(true);
            
            setSubTask([])
            setSubtitle('')
        } else {
            alert("You must be login to create a new task")
            history.push("./login")
        }
    }
    
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    
    const handleCloseWarning = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setWarning(!warning);
    }
    // console.log(subtask)
    
    return (
        <>
            
            <div className={classes.root} className="form">
                <div >
                    <TextField className="input" type="text" value={title} name="title"
                        placeholder="Title..." onChange={changeHandler}
                        label="Title"
                    />
                    <br />
                    <br/>
                    <TextField  className="input" type="date" value={date} name="date"
                        placeholder="dd/mm/yyyy" onChange={changeHandler}
                    />
                    <br/>
                    <br/>
                    <TextField label="Description" multiline className="input" type="text" value={des} name="des"
                        placeholder="Description..." onChange={changeHandler}
                    />
                    
                </div>
                <div className="border"></div>
                
                <div>
                    <TextField label="Sub Task" className="input" type="text" value={subtitle} name="subtitle"
                        placeholder="Sub Task..." onChange={SubTitleHandler}
                    />
                    <button className="addButton" onClick={handleAdd}>ADD</button>
                    <div>
                        {subtask?.map((item, index) => (
                            <div style={{ fontWeight: '600', textAlign:'left' }}>{ index +1}. {item}</div>
                        ))}
                    </div>
                </div>
                <div className="border"></div>
                <div>
                    <div style={{display:'flex'}}>
                        <div className="selector">
                            <div style={{display:'flex', justifyContent:'left'}} >
                                <input type="radio" value="todo" name="todo"
                                    onChange={changeHandler}
                                />
                                <label>Todo</label>
                            </div>
                            <div style={{display:'flex', justifyContent:'left',alignItems:'center', lineHeight:'30px'}} >
                                <input type="radio" value="inProcess" name="todo"
                                    placeholder="add" onChange={changeHandler}
                                />
                                 <label>In Process</label>
                            </div>
                            <div style={{display:'flex', justifyContent:'left',alignItems:'center', lineHeight:'30px'}} >
                                <input type="radio" value="done" name="todo"
                                    placeholder="add" onChange={changeHandler}
                                />
                                <label>Done</label>
                            </div>
                        </div>
                        
                        <div className="selector">
                            <div style={{display:'flex', justifyContent:'left',alignItems:'center', lineHeight:'30px'}}>
                                <input type="checkbox" name="official"
                                    onChange={changeHandler} />
                                <label>official</label>
                            </div>
                            <div style={{display:'flex', justifyContent:'left',alignItems:'center', lineHeight:'30px'}}>
                                <input type="checkbox" name="personal"
                                    onChange={changeHandler} />
                                    <label>Personal</label>
                        </div>
                            <div style={{display:'flex', justifyContent:'left',alignItems:'center', lineHeight:'30px'}}>
                                <input type="checkbox" name="other"
                                    onChange={changeHandler} />
                                <label>Ohter</label>
                            </div>
                        </div>
                    </div>

                    <button className="createBtn" onClick={handleSubmit}>
                        <i class="far fa-save"></i>
                        CREATE TASK
                    </button>
                </div>
                
            </div>
            <Snackbar open={!warning} autoHideDuration={6000} onClose={handleCloseWarning}>
                <Alert onClose={handleCloseWarning} severity="warning">
                You are not logged in. To create a new task, you must be logged in!
                </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                Your task was posted!
                </Alert>
            </Snackbar>
        </>
    )
}
export {Todo}