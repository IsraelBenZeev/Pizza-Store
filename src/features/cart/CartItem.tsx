import { FC } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { Button } from '../../ui/Button';
import { DeleteItem } from './DeleteItem';
import { UpdateItemsQuantitys } from './UpdateItemsQuantitys';
type CartItemProps = {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };
};
// export const CartItem: FC<CartItemProps> = ({ item }) => {
export const CartItem:FC<CartItemProps> = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-3 sm:flex sm:items-center sm:justify-between">
      <p className="sm-mb-1 mb-1">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-end gap-4 sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemsQuantitys pizzID={pizzaId} quantity={quantity} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
};

export default CartItem;
