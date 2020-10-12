import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
  Col,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handleSubmit(values) {
    this.props.addComment(
      this.props.dishId,
      values.rating,
      values.name,
      values.comment
    );
  }
  render() {
    return (
      <div className="container">
        <Button outline onClick={this.toggleModal} className="ml-n3">
          <span className="fas fa-pencil"></span>Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className="form-group ">
                <Label htmlFor="rating" className="ml-3">
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                    validators={{ required }}
                  >
                    <option selected disabled>
                      Rating
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
                <Errors
                  className="text-danger ml-3"
                  model=".rating"
                  show="touched"
                  messages={{ required: "A Rating is required" }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="name" className="ml-3">
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model=".name"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    validators={{
                      required,
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                </Col>
                <Errors
                  className="text-danger ml-3"
                  model=".name"
                  show="touched"
                  messages={{
                    required: "Your name is required",
                    minLength: "Name must be longer than 2 characters",
                    maxLength: "Name must be 15 characters or less",
                  }}
                />
              </Row>
              <Row className="form-group">
                <Label htmlFor="comment" className="ml-3">
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    className="form-control"
                    rows="6"
                  />
                </Col>
              </Row>
              <Row className="form-group mx-auto">
                <Button type="submit" color="primary">
                  Submit
                </Button>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
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
function RenderComments({ comments, addComment, dishId }) {
  if (comments === null || comments === undefined) {
    return (
      <div className="container">
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return (
      <div className="container">
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
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  }
}
const DishDetail = (props) => {
  if (props.selectedDish === null || props.selectedDish === undefined)
    return <div></div>;
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.selectedDish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.selectedDish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <div className="col-12 col-md-5 m-1">
          <RenderDish selectedDish={props.selectedDish} />
        </div>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <RenderComments
            comments={props.comments}
            addComment={props.addComment}
            dishId={props.selectedDish.id}
          />
        </div>
      </div>
    </div>
  );
};
export default DishDetail;
