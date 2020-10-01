import React from "react";
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap";
function RenderMenuItem({ dish, onPress }) {
  return (
    <Card key={dish.id} onClick={() => onPress(dish.id)}>
      <CardImg width="100%" src={dish.image} alt={dish.name} />
      <CardImgOverlay>
        <CardTitle>{dish.name}</CardTitle>
      </CardImgOverlay>
    </Card>
  );
}
const Menu = (props) => {
  const menu = props.dishes.map((dish) => {
    return (
      <div key={dish.id} className="col-11 col-md-5 m-1">
        <RenderMenuItem dish={dish} onPress={props.onPress} />
      </div>
    );
  });

  return (
    <div className="container">
      <div className="row">{menu}</div>
    </div>
  );
};

export default Menu;
