import React from "react";
import { withRouter } from "react-router";

class ViewGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      groupID: "",
      groupName: "",
      transactions: [],
      net: 0,
      recurring: [],
      recNet: 0,
      transaction: {},
    };

    this.selectTransaction = this.selectTransaction.bind(this);
    this.titleSubtitle = this.titleSubtitle.bind(this);
  }

  componentDidMount() {
    this.setState({ groupID: this.props.match.params.id }, () => {
      fetch(`/api/group/${this.state.groupID}`)
        .then((resp) => resp.json())
        .then((data) => {
          this.setState({ ...data.body });
        });
    });
  }

  selectTransaction(transaction) {
    this.setState({ transaction: transaction }, () => {
      console.log(this.state);
    });
  }

  titleSubtitle(title, subtitle) {
    return (
      <div>
        <div className="subheading">{title}</div>
        <div>
          {title != "Receipt" ? (
            subtitle
          ) : (
            <img src={`/images/${subtitle}`} width="100" height="100" />
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="two-col">
        <div className="threlement">
          <div>
            <div className="heading">Monthly Net</div>
            <div>Rs. {this.state.recNet}</div>
          </div>

          <div>
            <div className="heading">Total net</div>
            <div>Rs. {this.state.net}</div>
          </div>
        </div>
        <div className="threlement">
          <div className="heading">Transaction List</div>
          <div>
            {this.state.transactions.map((x) => {
              const transaction = {
                memo: x.memo,
                amount: x.amount,
                image: x.image,
                createdAt: x.createdAt,
              };

              return (
                <div
                  className="card"
                  onClick={(e) => this.selectTransaction(transaction)}
                >
                  <div>Rs. {x.amount}</div>
                  <div>{x.memo}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="threlement">
          <div className="heading">View Transaction</div>
          {this.state.transaction.amount ? (
            <div>
              {this.titleSubtitle("Amount", this.state.transaction.amount)}
              {this.titleSubtitle("Memo", this.state.transaction.memo)}
              {this.titleSubtitle("Receipt", this.state.transaction.image)}
              {this.titleSubtitle(
                "Created At",
                this.state.transaction.createdAt
              )}
            </div>
          ) : (
            <div>Select a Transaction!</div>
          )}
          {/* <div>Amount: {this.state.transaction.amount}</div>
          <div>Memo: {this.state.transaction.memo}</div>
          <div>Receipt: {this.state.transaction.image}</div>
          <div>Created At: : {this.state.transaction.createdAt}</div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(ViewGroup);
