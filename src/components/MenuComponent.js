import React from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle  } from 'reactstrap';
import DishDetail from './DishdetailComponent'

    function RenderMenuItem({dish, onClick}) {
        return (
          <div key={dish.id} className="col-12 col-md-5 m-1">
            <Card key={dish.id} onClick={() => onClick(dish.id)}>
              <CardImg width="100%" src={dish.image} alt={dish.name} />
              <CardImgOverlay>
                <CardTitle>{dish.name}</CardTitle>
              </CardImgOverlay>
            </Card>
          </div>
        );
    }

    const Menu = (props) => {
      const menu = this.props.dishes.map((dish) => {
        <div className="row">
        <RenderMenuItem dish={dish} onClick={props.onClick} />
      </div>
      });

        return (
          <div className="container">
            {menu}
            <DishDetail selectedDish={this.state.selectedDish} />
          </div>
        );
    }


export default Menu;