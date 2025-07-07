import { FC } from 'react';
import { MenuItem as MenuItemType } from '../../types/MenuItem';
import { formatCurrency } from '../../utils/helpers';
import { Button } from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { addItem } from '../cart/cartSlice';

export const MenuItem: FC<{ pizza: MenuItemType }> = ({ pizza }) => {
  const dispatch = useDispatch();
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
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
          {!soldOut ? (
            <Button onClick={handleAddToCart} type="small">
              Add To Cart
            </Button>
          ) : (
            <div className="bg-ston-200 rounded-full border-2 border-red-600 px-4 py-2 text-xs text-red-600 md:px-5 md:py-2.5">
              Sold out ❌
            </div>
          )}
        </div>
      </div>
    </li>
  );
};
