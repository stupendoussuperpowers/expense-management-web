import React from "react";
import "./addtransaction.css";

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupList: [],
      group: "",
      amount: 0,
      memo: "",
      type: null,
      recurring: false,
      image: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch("/api/userGroups/f9Lta3B8BniVB9zSP1iuG4")
      .then((resp) => {
        console.log(resp);
        return resp.json();
      })
      .then((data) => {
        console.log(data);
        this.setState({ groupList: data.body });
      });
  }

  handleSubmit(e) {
    console.log(this.state);
    const formData = new FormData();
    formData.append("user", "f9Lta3B8BniVB9zSP1iuG4");
    formData.append("groupID", this.state.group);
    formData.append("memo", this.state.memo);
    formData.append("amount", this.state.amount);
    formData.append("image", this.state.image[0]);
    formData.append("recurring", this.state.recurring);

    fetch("/api/addTransaction", {
      method: "post",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data));
  }

  render() {
    return (
      <div className="one-col">
        <div className="linear">
          <div className="heading">Add Transaction</div>
          <div className="subheading">Amount</div>
          <input
            type="text"
            placeholder="0"
            value={this.state.amount}
            onChange={(e) => this.setState({ amount: e.target.value })}
          />
          <div className="subheading">Group</div>
          <select
            onChange={(e) => {
              this.state.group = e.target.value;
            }}
          >
            {this.state.groupList.map((x) => {
              return (
                <option value={x.groupID} key={x.groupName - 1}>
                  {x.groupName}
                </option>
              );
            })}
          </select>
          <div>
            <div className="subheading">Memo</div>
            <input
              type="text"
              value={this.state.memo}
              onChange={(e) => this.setState({ memo: e.target.value })}
              placeholder="Memo"
            />
          </div>
          <div>
            <label>
              <input
                type="radio"
                name="credit"
                checked={this.state.type === "credit"}
                onChange={(e) => this.setState({ type: "credit" })}
              />
              Credit
            </label>
            <label>
              <input
                type="radio"
                name="debit"
                checked={this.state.type === "debit"}
                onChange={(e) => this.setState({ type: "debit" })}
              />{" "}
              Debit
            </label>
          </div>
          <label>
            <input
              type="checkbox"
              onChange={(e) =>
                this.setState({ recurring: !this.state.recurring })
              }
            />{" "}
            Recurring
          </label>
          <div className="subheading">Receipt</div>
          <input
            type="file"
            placeholder="Receipt"
            onChange={(e) => this.setState({ image: e.target.files })}
          />
          <button className="butt" onClick={this.handleSubmit}>
            Add Transaction
          </button>
        </div>
      </div>
    );
  }
}

export default AddTransaction;
