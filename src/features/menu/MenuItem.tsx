import { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types/MenuItem';
import { formatCurrency } from '../../utils/helpers';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, getQuantityById } from '../cart/cartSlice';
import { DeleteItem } from '../cart/DeleteItem';
import { UpdateItemsQuantitys } from '../cart/UpdateItemsQuantitys';

export const MenuItem: FC<{ pizza: MenuItemType }> = ({ pizza }) => {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getQuantityById(id));
  // console.log('currentQuantity: ', currentQuantity);
  const isInCart = currentQuantity > 0;
  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  };
  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 rounded-r-full ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm uppercase text-stone-500">Sold out</p>
          )}
          {isInCart && (
            <div className="flex place-items-center gap-3 sm:gap-4 ">
              <UpdateItemsQuantitys quantity={currentQuantity} pizzID={id} />
              {isInCart && <DeleteItem id={pizza.id} />}
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button onClick={handleAddToCart} type="small">
              Add To Cart
            </Button>
          )}
          {soldOut && (
            <div className="bg-ston-200 rounded-full border-2 border-red-600 px-4 py-2 text-xs text-red-600 md:px-5 md:py-2.5">
              Sold out ❌
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
