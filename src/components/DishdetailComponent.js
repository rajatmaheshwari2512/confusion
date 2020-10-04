import React from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";

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
  if (comments === null || comments === undefined) {
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
  var comments = props.comments;
  if (selectedDish === null || selectedDish === undefined) return <div></div>;
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{selectedDish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{selectedDish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish selectedDish={selectedDish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <RenderComments comments={comments} />
        </div>
      </div>
    </div>
  );
};
export default DishDetail;
