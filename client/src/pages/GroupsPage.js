import React from "react";
import { withRouter } from "react-router";

class GroupsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groups: [],
    };
  }

  groupCard(group) {
    return (
      <div className="hor card">
        <div
          onClick={(e) => {
            this.props.history.push(`/group/${group.groupID}`);
          }}
        >
          {group.groupName}
        </div>
      </div>
    );
  }

  componentDidMount() {
    fetch("/api/userGroups/f9Lta3B8BniVB9zSP1iuG4")
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ groups: data.body });
      });
  }

  render() {
    return (
      <div className="fullwidth">
        <div className="heading">Your Groups</div>
        {this.state.groups.map((x) => {
          return this.groupCard(x);
        })}
      </div>
    );
  }
}

export default withRouter(GroupsPage);
