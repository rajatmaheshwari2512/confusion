import React from "react";
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap";

function RenderDish({ selectedDish }) {
  return (
    <Card>
      <CardImg width="100%" src={selectedDish.image} alt={selectedDish.name} />
      <CardBody>
        <CardTitle>{selectedDish.name}</CardTitle>
        <CardText>{selectedDish.description}</CardText>
      </CardBody>
    </Card>
  );
}
function RenderComments({ comments }) {
  if (comments === null || comments == undefined) {
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
                -- {comment.author},
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                }).format(new Date(Date.parse(comment.date)))}
              </li>
              <br></br>
            </div>
          );
        })}
      </ul>
    );
  }
}
const DishDetail = (props) => {
  var selectedDish = props.selectedDish;
  if (selectedDish === null || selectedDish === undefined) return <div></div>;
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish selectedDish={selectedDish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <RenderComments comments={selectedDish.comments} />
        </div>
      </div>
    </div>
  );
};
export default DishDetail;
