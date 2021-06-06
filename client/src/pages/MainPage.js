import React from "react";
import "./mainpage.css";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupName: "",
      groupDesc: "",
      groupID: "",
    };
    this.createGroup = this.createGroup.bind(this);
    this.joinGroup = this.joinGroup.bind(this);
  }

  createGroup(event) {
    fetch("/api/createGroup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: "f9Lta3B8BniVB9zSP1iuG4",
        groupName: this.state.groupName,
      }),
    });
  }

  joinGroup(event) {
    fetch("/api/joinGroup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userID: "f9Lta3B8BniVB9zSP1iuG4",
        groupID: this.state.groupID,
      }),
    });
  }

  render() {
    return (
      <div className="two-col">
        <div className="linear">
          <div>Create Group</div>
          <input
            type="text"
            placeholder="Enter Group Name"
            value={this.state.groupName}
            onChange={(e) => this.setState({ groupName: e.target.value })}
          />
          <input
            type="text"
            placeholder="Enter Description"
            value={this.state.groupDesc}
            onChange={(e) => this.setState({ groupDesc: e.target.value })}
          />
          <button className="butt" onClick={this.createGroup}>
            Create Group
          </button>
        </div>
        <div className="linear">
          <div>Join Group</div>
          <input
            type="text"
            placeholder="Enter Description"
            value={this.state.groupID}
            onChange={(e) => this.setState({ groupID: e.target.value })}
          />
          <button className="butt" onClick={this.joinGroup}>
            Join Group
          </button>
        </div>
      </div>
    );
  }
}

export default MainPage;
