import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField } from '@material-ui/core';
import ParticlesBg from "particles-bg";
import classnames from "classnames";  
import 
{Button, 
  Grid,
  Tooltip , 
  IconButton, 
  Snackbar,
  Menu,
  MenuItem} 
  from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import {Add,
  Delete} from '@material-ui/icons';
import { proposeProject } from "../../actions/authActions";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class EditProject extends Component {
  constructor() { 
    super();
    this.state = {
        contactmail: "",
        topic: "",
        title: "",
        technology: "",
        deadline: new Date('2020-05-20T21:11:54'),
        idea: "",
        githubrepo: "",
        team: [{
          name: "",
          role: "",
        }],
        open : false,
        state: "",
        openerror: false,
        errors: {},
        menu1: null,
        menu2: null,
        activeStep: 0,
        steps: ['Select Category Of Project', 'Enter Title Of Project', 'Technology Needed for Project', 'Propose Your Idea', "Enter Contact Mail", "Deadline Of Project" , "Github Link of Project", " Add Team Member " , "Select state"],
    };
  }
  handleNext = () => {
    this.setState({activeStep: this.state.activeStep+1});
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep-1});
  };
  componentDidMount() { 
    axios.get("/projects/getdata")
    .then((response) => {
        response.data.map(data=>{
            console.log(this.props.match.params.id)
            if(data._id===this.props.match.params.id)
            {
                this.setState({ 
                    contactmail: data.contactmail,
                        topic: data.topic,
                        title: data.title,
                        technology: data.technology,
                        deadline: data.deadline,
                        idea: data.idea,
                        githubrepo: data.github,
                        team: data.team,
                        state: data.state,
                    });
            }
        });
    });

  }
  getStepContent(step) {
    const { errors } = this.state
    switch (step) {
      case 0:
        return (
            <div>
                 <div className="field"> 
                 <TextField
                    required
                    variant="outlined"
                    disabled
                    label="Topic Of Project"
                    fullWidth
                    value={this.state.topic}
                    error={errors.topic}  
                    id="topic"
                    type="text"
                    className={classnames("", {
                      invalid: errors.title
                    })}
                  />
              </div>
            </div>
        )
      case 1:
        return (
          <div className="field">
          <TextField
            required
            variant="outlined"
            label="Title Of Project"
            fullWidth
            onChange={this.onChange}
            value={this.state.title}
            error={errors.title}  
            id="title"
            type="text"
            className={classnames("", {
              invalid: errors.title
            })}
          />
          <span className="text-danger">{errors.title}</span>
          </div>
        )
      case 2:
        return  (
          <div className="field">
            <TextField
              required
              variant="outlined"
              label="Technology Required"
              fullWidth
              onChange={this.onChange}
              value={this.state.technology}
              error={errors.technology}  
              id="technology"
              type="text"
              className={classnames("", {
                invalid: errors.technology
              })}
            />
          <span className="text-danger">{errors.technology}</span>
        </div>
        )
      case 3: 
      return (
        <div className="field">
        <TextField
          required
          variant="outlined"
          label="Idea"
          fullWidth
          multiline
          rows={6}
          onChange={this.onChange}
          value={this.state.idea}
          error={errors.idea}  
          id="idea"
          type="text"
          className={classnames("", {
            invalid: errors.idea
          })}
        />
        <span className="text-danger">{errors.idea}</span>
        </div>
      )
      case 4: 
      return (
        <div className="field">
        <TextField
          required
          variant="outlined"
          label="Enter Contact Mail"
          fullWidth
          onChange={this.onChange}
          value={this.state.contactmail}
          error={errors.contactmail}  
          id="contactmail"
          type="email"
          className={classnames("", {
            invalid: errors.contactmail
          })}
        />
        <span className="text-danger">{errors.email}</span>
        </div>
      )
      case 5:
        return (
          <div className="field">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="deadline"
              label="Deadline"
              format="dd/MM/yyyy"
              value={this.state.deadline}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
                
              }}
              style={{width: "100%", marginTop:"20px", marginBottom:"20px"}}
            />
            </MuiPickersUtilsProvider>
            <span className="text-danger">{errors.deadline}</span>
            </div>
        )
      case 6:
        return (
          <div className="field">
            <TextField
              required
              variant="outlined"
              label="Enter Github Repo link for this project"
              fullWidth
              onChange={this.onChange}
              value={this.state.githubrepo}
              error={errors.githubrepo}  
              id="githubrepo"
              type="text"
              className={classnames("", {
                invalid: errors.githubrepo
              })}
            />
            <span className="text-danger">{errors.github}</span>
            </div>
        ) 
        case 8 : 
        return (
            <div>
               {this.state.team.map((option, index) => {
                  return (
                    <Grid item key="index">
                    <div class="input-root">
                    <Tooltip title="Edit Team">    
                        <TextField
                        label="Team Member"
                        halfWidth
                        onChange={this._handleTeamChange}
                        value={this.state.team[index].name}
                        id={index}
                        type="text"
                        style={{ width: "30%",marginTop:"20px", marginBottom:"20px",marginLeft:"20px"}}
                        />
                    </Tooltip>
                    <TextField
                        label="Role(Mentor/Mentee)"
                        halfWidth
                        value={this.state.team[index].role}
                        onChange={this._handleRoleChange}
                        id={index}
                        type="text"
                        style={{ width: "40%",marginTop:"20px", marginBottom:"20px",marginLeft:"20px"}}
                        />
                    
                    <Tooltip title="Delete Team">
                      <IconButton aria-label="delete" onClick={() => this._deleteTeamMember(index)}
                        visible="flase" style={{size:"10%", marginTop:"22px", marginBottom:"20px",marginLeft:"20px"}}>
                          <Delete />
                        </IconButton>
                    </Tooltip>
                    </div>
                    </Grid>
                  );
                })}
                
              <Tooltip title="Add Member">
                  <Button 
                  size="large"
                  onClick={this.addTextField}
                  style={{
                      width:"100%",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginBottom: "20px",
                      marginTop: "20px"
                    }}>
                        
                    <Add/>
                  </Button>

                  </Tooltip>
            </div>
        )
        case 7:
          return (
            <div>
                 <div className="field"> 
                 <TextField
                  required
                  label="Status Of the project"
                  fullWidth
                  value={this.state.state}
                  error={errors.state}  
                  id="state"
                  type="text"
                  className={classnames("", {
                    invalid: errors.state
                  })}
                  style={{width: "85%"}}
                />
              <Tooltip title="select state of project">  
              <Button 
              aria-controls="simple-menu" 
              aria-haspopup="true" 
              onClick={this.menu2Click} 
              style={{ size:"10%", marginTop:"20px", marginBottom:"20px"}}
              >
                <ExpandMoreIcon />
              </Button>
              </Tooltip>  
              <Menu
              id="simple-menu"  
              open={Boolean(this.state.menu2)}
              onClose={this.menu2Close}
              >
                  <MenuItem index="proposed"  onClick={this.menu2handle}> Proposed</MenuItem>
                  <MenuItem index="ongoing" onClick={this.menu2handle}> Ongoing </MenuItem>
                  <MenuItem index="completed" onClick={this.menu2handle}>Completed</MenuItem>
              </Menu>
              </div>
            </div>
        )
    }
  }
  onSubmit = e => {
    e.preventDefault();
    const newProject = {
       team : this.state.team,
       topic: this.state.topic,
       technology: this.state.technology,
       title: this.state.title,
       contactmail: this.state.contactmail,
       idea: this.state.idea,
       deadline: this.state.deadline,
       github: this.state.githubrepo,
       proposedid: this.props.auth.user.id,
       proposedby: this.props.auth.user.name,
       state: this.state.state,
       _id: this.props.match.params.id
    };

    axios.post("/projects/updateproject",newProject)
    .then(res=> 
      {this.setState({
        open : true,
        errors: {},
      })
      this.props.history.push("/project")
    })
      .catch(err => {
        console.log(err.response.data);
        this.setState({errors: err.response.data , activeStep: 0, openerror: true});
    })  
    console.log(this.state);
    
  }; 
  menuClick = (event) => {
    this.setState({menu1: event.currentTarget})
  }
  menuClose = () => {
    this.setState({menu1: null});
  }
  menuhandle = (e) => {
       e.preventDefault();
       this.setState({topic: e.target.getAttribute('index'),
                      menu1: null });
  }
  menu2Click = (event) => {
    this.setState({menu2: event.currentTarget})
  }
  menu2Close = () => {
    this.setState({menu2: null});
  }
  menu2handle = (e) => {
    e.preventDefault();
    this.setState({state: e.target.getAttribute('index'),
                   menu2: null });
  }
  handleDateChange = (date) => {
    this.setState({deadline: date});
    console.log(this.state);
  };
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({open: false , openerror: false});
  };
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
        open: false,
      });
    }
  }
 
  _handleTeamChange= event => {
    var list = this.state.team.map((option, index) => {
      if (index == event.target.id) {
        option.name= event.target.value;
      };
      return option;
    });
    this.setState({
      team: list  
    });
  }
  _handleRoleChange= event => {
    var list = this.state.team.map((option, index) => {
      if (index == event.target.id) {
        option.role= event.target.value;
      };
      return option;
    });
    this.setState({
      team: list  
    });
  }
  _deleteTeamMember(id) {
    this.setState(state => ({
       team: state.team.filter((el, ind) => ind != id),
    }));
    console.log(this.state);
  }
  addTextField = e => {
     
     this.setState({
     team: [...this.state.team, {name: "" , role: ""}]
    });
    console.log(this.state);
  }
  render() {
    return (
      <div style={{ marginTop : "70px"}}>
      <span style={{marginLeft: "10px"}}>    <Link to ="/" style={{color: "grey"}}> Home </Link> / <Link to ="/project" style={{color: "grey"}}> Project</Link> /  Edit</span>
          <ParticlesBg color="#050d45"  num={90} type="cobweb" bg={true}   position="absolute" />
           <div class="container">
                <div  class="inner">
                  <h1>Propose A Project</h1> 
                    <form noValidate onSubmit={this.onSubmit} style={{ margin: "30px 30px "  }}>
                    
                    {this.state.steps.map((label, index) => (
                    <Step>                                                                                                         
                    <Typography>{this.getStepContent(index)}</Typography>
                    </Step>
                        ))}
                        <Paper square elevation={0}>
                          <button 
                            type="button" 
                            class="btn btn-primary btn-lg btn-block card-1" 
                            type="submit" 
                            style={{
                                borderRadius: "3px",
                                letterSpacing: "1.5px",
                                marginTop: "1rem"
                              }}>
                                  Save
                        </button>
                        </Paper>   

                      
                        <Snackbar style={{width: "100%"}}open={this.state.open} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="success">
                             Information updated Successfully
                          </Alert>
                        </Snackbar>
                        <Snackbar style={{width: "100%"}}open={this.state.openerror} autoHideDuration={4000} onClose={this.handleClose}>
                          <Alert onClose={this.handleClose} severity="error">
                              Fill all Information
                          </Alert>
                        </Snackbar>
                    </form>
                </div>
          </div>
      </div>

    );
  }
}

EditProject.propTypes = {
  proposeProject: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { proposeProject }
)(withRouter(EditProject));

