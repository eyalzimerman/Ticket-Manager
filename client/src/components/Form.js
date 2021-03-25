import React from "react";

function Form() {
  return (
    <div className="all-form">
      <form method="post" action="/api/tickets/new/">
        <h1>Add New Ticket</h1>
        <fieldset>
          <label>
            Title
            <input className="title-form" name="title" required />
          </label>
          <label>
            content
            <input className="content-form" name="content" required />
          </label>
          <label>
            User Email
            <input
              className="userEmail-form"
              name="userEmail"
              type="email"
              required
            />
          </label>
          <label>
            Creation Time
            <input
              className="creationTime-form"
              name="creationTime"
              type="date"
              required
            />
          </label>
          <label>
            Help
            <input
              type="checkbox"
              name="labels[]"
              value="help"
              className="help-label-form"
            ></input>
          </label>
          <label>
            Tech
            <input
              type="checkbox"
              name="labels[]"
              value="tech"
              className="tech-label-form"
            ></input>
          </label>
          <label>
            Guidelines
            <input
              type="checkbox"
              name="labels[]"
              value="guidelines"
              className="guidelines-label-form"
            ></input>
          </label>
          <label>
            Corvid
            <input
              type="checkbox"
              name="labels[]"
              value="corvid"
              className="corvid-label-form"
            ></input>
          </label>
          <label>
            Api
            <input
              type="checkbox"
              name="labels[]"
              value="api"
              className="api-label-form"
            ></input>
          </label>
          <label>
            Collapse
            <input
              type="checkbox"
              name="labels[]"
              value="collapse"
              className="collapse-label-form"
            ></input>
          </label>
          <label>
            Expand
            <input
              type="checkbox"
              name="labels[]"
              value="expand"
              className="expand-label-form"
            ></input>
          </label>
          <label>
            Problem
            <input
              type="checkbox"
              name="labels[]"
              value="problem"
              className="problem-label-form"
            ></input>
          </label>
          <label>
            Login
            <input
              type="checkbox"
              name="labels[]"
              value="login"
              className="login-label-form"
            ></input>
          </label>
          <label>
            Tutorial
            <input
              type="checkbox"
              name="labels[]"
              value="tutorial"
              className="tutorial-label-form"
            ></input>
          </label>
          <label>
            View Count
            <input
              type="checkbox"
              name="labels[]"
              value="view count"
              className="view-count-label-form"
            ></input>
          </label>
        </fieldset>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
// "Help",
// "Tech",
// "Guidelines",
// "Corvid",
// "Api",
// "Collapse",
// "Expand",
// "Problem",
// "Login",
// "Tutorial",
// "View Count",
