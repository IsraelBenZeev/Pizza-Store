import { FC } from 'react';
import { formatCurrency } from '../../utils/helpers';
import { Button } from '../../ui/Button';
type CartItemProps = {
  item: {
    pizzaId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  };
};
export const CartItem: FC<CartItemProps> = ({ item }) => {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between '>
      <p className='mb-1 sm-mb-1'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>{formatCurrency(totalPrice)}</p>
        <Button type='small'>Delete</Button>
      </div>
    </li>
  );
};

export default CartItem;
