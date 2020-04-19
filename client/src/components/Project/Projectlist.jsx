import React, { Component } from 'react'
import './projectlist.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailIcon from '@material-ui/icons/Mail';
import axios from 'axios';
import {Link} from "react-router-dom";
import Chip from '@material-ui/core/Chip';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit"
import Search from '../Images/search.png'
import TextField from "@material-ui/core/TextField"
import game from '../Images/game.jpg';
import blockchain from '../Images/blockchain.jpg';
import AI from '../Images/AI.jpg';
import web from '../Images/web.jpg';
import app from '../Images/app.jpg';
import competitive from '../Images/competitive.jpg';
import ml from'../Images/ml.jpeg';
import ip from '../Images/ip.jpg';
import cc from '../Images/cc.jpg';
import Moment from 'react-moment';

function searchingfor(searchstring) {
    return function (x) {
        return x.topic.toLowerCase().includes(searchstring.toLowerCase()) || !searchstring;
    }
  }

class Projectlist extends Component {
    state = {
        right: false,
        searchstring: "",
        Data: []
      }
      onSearchInputChange = (event) => {
        console.log("Search changed ..." + event.target.value)
        if (event.target.value) {
            this.setState({ searchstring: event.target.value })
        } else {
            this.setState({ searchstring: '' })
        }
      }
      componentDidMount() { 
        axios.get('/projects/getdata')
        .then((response) => {
            this.setState({Data: response.data})
        });
      }
      getStepContent(step){
          switch(step){
            case "App Development":
                return (
                    <div>
                        <img src= {app} style={{height: "200px" , width: "100%"}} />
                    </div>
                )
            case "Web Development":
            return (
                <div>
                    <img src= {web} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Game Development":
            return (
                <div>
                    <img src= {game} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Competitive Programming":
            return (
                <div>
                    <img src= {competitive} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Machine Learning":
            return (
                <div>
                    <img src= {ml} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Cloud Computing":
            return (
                <div>
                    <img src= {cc} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Image Processing":
            return (
                <div>
                    <img src= {ip} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Blockchain":
            return (
                <div>
                    <img src= {blockchain} style={{height: "200px" , width: "100%"}} />
                </div>
            )
            case "Artificial Intelligence":
            return (
                <div>
                    <img src= {AI} style={{height: "200px" , width: "100%"}} />
                </div>
            )
          }
      }
      fetch_data(){
        return this.state.Data.filter(searchingfor(this.state.searchstring)).map(data =>{
            var badgelist="";
            var badgeItems=[];
            badgelist = data.technology.split(",");
            badgeItems = badgelist.map((badge) =>
                   <Chip variant="outlined" size= "small" 
                   color="info.main" label={badge} icon={<CheckCircleOutlineIcon />}/>
                  );
                var table = (
                <TableContainer>
                    <Table a
                    
                    ria-label="customized table">
                    <TableHead>
                    <TableRow style={{backgroundColor: "black"}}>
                        <TableCell style={{color: "white"}}> Team Member </TableCell>
                        <TableCell  style={{color: "white"}} align="right"> Role </TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.team.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.role}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            return(
                <div>
                    <div class="flip-card col-lg-4 col-sm-12" style={{float: "left"}}>
                    <div class="flip-card-inner">
                        <div class="flip-card-front">
                        <Card classname="card">
                            <CardHeader
                                avatar={
                                <Avatar style={{color: "black"}}>
                                </Avatar>
                                }
                                title={data.proposedby}
                            />
                            {this.getStepContent(data.topic)}
                            
                            <CardContent>
                                 <h3 style={{color: "teal" , fontFamily: "roboto"}}> {data.title} </h3>
                                 <hr />
                                 <h6> Technologies </h6>
                                 {badgeItems}
                                 <hr />
                                 <h6>Category</h6>
                                 <Chip  color="green" label={data.topic} />
                                 <hr />
                                 <b> Deadline : </b>
                                 <Moment format="DD-MM-YY">
                                   {data.deadline} 
                                </Moment>
                            </CardContent>
                            </Card>
                        </div>
                        <div class="flip-card-back">
                        <Card>
                                <Avatar style={{float: "left"}}/>
                                  <Link to = {`/profile/${data.proposedid}`} style={{marginLeft: "5px", color: "black", float: "left"}}>
                                  {data.proposedby}
                                  </Link>
                                  {this.props.auth.user.id===data.proposedid ?
                                  <Link to = {`/project/edit/${data._id}`} style={{marginLeft: "5px",color: "grey", float:"right"}} >
                                     <EditIcon />
                                  </Link>: null}
                                  <a href={data.github} style={{marginLeft: "5px", color: "grey", float:"right"}}>
                                      <GitHubIcon />
                                  </a>
                                  <a href = {`mailto:${data.contactmail}`} style={{marginLeft: "5px" , color: "grey", float:"right"}}>
                                      <MailIcon />
                                  </a>
                            <CardContent>
                                <h6 style={{marginTop: "20px"}}> Idea </h6>
                                <Typography variant="body2" color="textSecondary" component="p">
                                  {data.idea}
                                </Typography>
                                <h6> Team </h6>
                                {table}
                            </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
                </div>
            )});
      }
    render() {
        return (
            <div style={{marginTop: "100px"}} class="container" >
              <div style={{   paddingTop:"10px", textAlign: "center"}}>
                <h1 style={{fontFamily: "roboto"}}> Projects </h1>
                <TextField
                    label="Search By Project Category"
                    fullWidth
                    onChange={this.onSearchInputChange}
                    value={this.state.searchstring}
                    id="searchInput"
                    type="text"
                style={{width: "20%"}}
                />
                 <img style={{width:"20px",   marginTop: "20px" }}src={Search} alt="Techmate" />
                </div>
                <div style={{marginTop: "20px"}}>
                {this.fetch_data()}
                </div>
                   
                
            </div>
        )
    }
}
Projectlist.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
  )(withRouter(Projectlist));