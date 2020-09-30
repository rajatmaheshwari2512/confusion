import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
class DishDetail extends Component {
  constructor(props) {
    super(props);
  }
  renderDish(selectedDish) {
    return (
      <Card>
        <CardImg
          width="100%"
          src={selectedDish.image}
          alt={selectedDish.name}
        />
        <CardBody>
          <CardTitle>{selectedDish.name}</CardTitle>
          <CardText>{selectedDish.description}</CardText>
        </CardBody>
      </Card>
    );
  }
  renderComments(comments) {
    if (comments === null) {
      return <div></div>;
    } else {
      return (
        <ul className="list-unstyled">
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <li>{comment.comment}</li>
                <br></br>
                <li>
                  -- {comment.author},{comment.date}
                </li>
                <br></br>
              </div>
            );
          })}
        </ul>
      );
    }
  }
  render() {
    var selectedDish = this.props.selectedDish;
    if (selectedDish === null) {
      return <div></div>;
    }
    return (
      <div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            {this.renderDish(selectedDish)}
          </div>
          <div className="col-12 col-md-5 m-1">
            <h4>Comments</h4>
            {this.renderComments(selectedDish.comments)}
          </div>
        </div>
      </div>
    );
  }
}
export default DishDetail;
