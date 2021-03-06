import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TextareaAutosize } from "@material-ui/core";
import {
  QuestionAnswer,
  FilterList,
  Stars,
  PersonPin,
  Delete,
  Edit,
} from "@material-ui/icons";
import {
  getForum,
  deletePost,
  likeForum,
  getCategory,
  getUserPost,
} from "../../actions/forumActions";
import { Spinner } from "react-spinners-css";
import Moment from "react-moment";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";

const Forum = ({
  getForum,
  errors,
  getCategory,
  getUserPost,
  likeForum,
  deletePost,
  forum: { forum, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getForum();
  }, []);

  const [category, setCategory] = useState("All");
  const [likeAlert, setLikeAlert] = useState(false);
  const [likePost, setLikePost] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(category);
    if (category === "All") getForum();
    else if (category === "My Posts") getUserPost();
    else getCategory({ category });
  };

  return loading || errors.auth || forum === null ? (
    <Fragment>
      <div class="deadcentre" style={{ marginBottom: "100px" }}>
        <h1>Please &nbsp; &nbsp; &nbsp; &nbsp; wait....</h1>

        <div class="deadcentre">
          <Spinner />
        </div>
      </div>
      <div style={{ marginTop: "100px" }}>
        <h1 className="text-danger"> {errors.auth}</h1>
        <h1 className="text-danger"> {errors.servererror}</h1>
      </div>
    </Fragment>
  ) : (
    <div style={{ marginTop: "100px" }}>
      <span style={{ marginLeft: "10px" }}>
        {" "}
        <Link to="/" style={{ color: "grey" }}>
          {" "}
          Home{" "}
        </Link>{" "}
        / <Link to="/forum"> Forum</Link>
      </span>
      <div
        style={{
          letterSpacing: "3.5px",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <h1>FORUM</h1>
      </div>
      <div style={{ marginTop: "20x", textAlign: "center" }}>
        <button type="button" class="btn btn-md btn-dark">
          <Link
            to="/forum/post"
            style={{
              textDecoration: "none",
              color: "white",
              letterSpacing: "3px",
            }}
          >
            POST QUERY
          </Link>
        </button>
        <h5 style={{ marginTop: "10px", marginBottom: "10px" }}> Posts </h5>
        <h3>
          <b>{forum.length}</b>
        </h3>
        <div style={{ marginTop: "20px" }}>
          <h5> Select a Category </h5>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div>
              <span class="select" style={{ width: "90%", margin: "5px 5%" }}>
                <select
                  name="slct"
                  id="slct"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.currentTarget.value);
                    console.log(category);
                  }}
                >
                  <option selected disabled>
                    Choose an option
                  </option>
                  <option value="All">All</option>
                  <option value="My Posts">My Posts</option>
                  <option value="Competitive Programming">
                    Competitive Programming
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="App Development">App Development</option>
                  <option value="Game Development">Game Development</option>
                  <option value="Blockchain">Blockchain</option>
                  <option value="Artifical Intelligence">
                    Artifical Intelligence
                  </option>
                  <option value="Cloud Comuting">Cloud Comuting</option>
                  <option value="Image Processing">Image Processing</option>
                  <option value="Other">Other</option>
                </select>
              </span>
            </div>
            <button
              type="submit"
              class="btn btn-sm btn-dark"
              style={{ marginTop: "10px" }}
            >
              {" "}
              <FilterList /> Filter{" "}
            </button>
          </form>
        </div>
        <div style={{ marginTop: "30px", textAlign: "left" }}>
          {forum.map((post) => (
            <div key={post._id} style={{ margin: "2% 2%" }}>
              <div>
                <div class="border rounded" style={{ padding: "2% 2%" }}>
                  <h6>
                    {" "}
                    <PersonPin />
                    <b>
                      <Link to={`/profile/${post.member}`}>{post.name}</Link>
                    </b>{" "}
                    asks{" "}
                    <Link to={`/forum/show/${post._id}`}> {post.doubt} </Link>{" "}
                  </h6>
                  {post.description !== "" && (
                    <TextareaAutosize
                      rowsMax={5}
                      readOnly
                      rowsMin={3}
                      style={{
                        width: "100%",
                        padding: "1% 1%",
                        border: "white",
                      }}
                    >
                      {post.description}
                    </TextareaAutosize>
                  )}
                  <br></br>

                  {post.code !== "" && (
                    <div>
                      <h5
                        style={{
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          marginTop: "1%",
                        }}
                      >
                        Code Snippet :
                      </h5>
                      <TextareaAutosize
                        readOnly
                        rowsMin={3}
                        rowsMax={10}
                        style={{
                          width: "100%",
                          border: "black",
                          padding: "2% 4%",
                          fontFamily: "monospace",
                          fontWeight: "bold",
                          background: "#e3e2e1",
                        }}
                      >
                        {post.code}
                      </TextareaAutosize>
                    </div>
                  )}

                  <p className="text-muted">
                    <span class="text-monospace">
                      {" "}
                      <Moment format="DD/MM/YY HH:mm" date={post.date} />
                      &nbsp;
                    </span>
                    <Link to={`/forum/show/${post._id}`}>
                      {" "}
                      <QuestionAnswer /> {post.n_comments}{" "}
                    </Link>
                    <button
                      class="btn btn-link"
                      onClick={() => {
                        likeForum(post._id);
                        setLikeAlert(true);
                        setLikePost(post._id);
                      }}
                    >
                      <Stars /> {post.likes}{" "}
                    </button>
                    {user.id === post.member && (
                      <button
                        style={{ marginLeft: "2px" }}
                        class="btn btn-link"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Are you sure you wish to delete this item?"
                            )
                          ) {
                            deletePost(post._id);
                            getForum();
                            window.alert("Your Post is deleted");
                          }
                        }}
                      >
                        {" "}
                        <Delete />
                      </button>
                    )}
                    {user.id === post.member && (
                      <Link to={`/forum/editpost/${post._id}`}>
                        <button class="btn btn-link">
                          <Edit />
                        </button>
                      </Link>
                    )}
                  </p>
                  {likeAlert && post._id === likePost && (
                    <Alert
                      onClose={() => {
                        setLikeAlert(false);
                      }}
                      severity="success"
                    >
                      You Liked this post
                    </Alert>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Forum.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  forum: PropTypes.object.isRequired,
  getForum: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  likeForum: PropTypes.func.isRequired,
  category: PropTypes.func.isRequired,
  getUserPost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  forum: state.forum,
});

export default connect(mapStateToProps, {
  getForum,
  deletePost,
  likeForum,
  getCategory,
  getUserPost,
})(withRouter(Forum));
