import React from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  DELETE_INGREDIENT_FROM_CONSTRUCTOR,
  REPLACE_INGREDIENTS,
} from "../../services/actions/ingredients";
import constructorSt from "./burger-constructor.module.css";
import { ingredientsPropTypes } from "../../utils/types";

function BurgerConstructorItem(props) {
  const dispatch = useDispatch();

  const deleteIngredientFromConstructor = (e, item) => {
    e.preventDefault();

    dispatch({
      type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
      id: item._uid,
    });
  };

  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: "constructorIngredient",
    hover: (item, monitor) => {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = props.index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

      dispatch({
        type: REPLACE_INGREDIENTS,
        payload: {
          ingredientDroppedId: item.uid,
          whereIngredientDroppedId: props.uid,
        },
      });

      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "constructorIngredient",
    item: () => {
      return { uid: props.uid, index: props.index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li ref={ref} draggable className={constructorSt.order_main} style={{}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          width: "100%",
        }}
      >
        <DragIcon type="primary" />
        <ConstructorElement
          isLocked={false}
          text={props.item.name}
          price={props.item.price}
          thumbnail={props.item.image}
          handleClose={(e) => deleteIngredientFromConstructor(e, props.item)}
        />
      </div>
    </li>
  );
}

BurgerConstructorItem.propTypes = {
  item: ingredientsPropTypes.isRequired,
  index: PropTypes.number.isRequired,
};

export default BurgerConstructorItem;
