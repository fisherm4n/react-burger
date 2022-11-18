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
import { TBurgerConstructorItem } from "../../utils/types";
const BurgerConstructorItem = ({
    index,
    uid,
    item,
}: TBurgerConstructorItem) => {
    const dispatch = useDispatch();

    const deleteIngredientFromConstructor = () => {
        dispatch({
            type: DELETE_INGREDIENT_FROM_CONSTRUCTOR,
            id: uid,
        });
    };

    const ref = React.useRef<HTMLLIElement>(null);

    const [, drop] = useDrop({
        accept: "constructorIngredient",
        hover: (item: TBurgerConstructorItem, monitor) => {
            if (!ref.current) return;

            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch({
                type: REPLACE_INGREDIENTS,
                payload: {
                    ingredientDroppedId: item.uid,
                    whereIngredientDroppedId: uid,
                },
            });

            index = hoverIndex;
        },
    });

    const [, drag] = useDrag({
        type: "constructorIngredient",
        item: () => {
            return { uid: uid, index: index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    drag(drop(ref));

    return (
        <li ref={ref} draggable className={constructorSt.order_main}>
            <DragIcon type="primary" />
            <ConstructorElement
                isLocked={false}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={deleteIngredientFromConstructor}
            />
        </li>
    );
};

export default BurgerConstructorItem;
