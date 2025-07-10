import { FC } from 'react';
import { Button } from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';

export const UpdateItemsQuantitys: FC<{ pizzID: number; quantity: number }> = ({
  pizzID,
  quantity
}) => {
  const disoatch = useDispatch();
  return (
    <div className="flex items-center justify-between gap-2 md:gap-4">
      <Button
        type="round"
        onClick={() => disoatch(decreaseItemQuantity(pizzID))}
      >
        -
      </Button>
      <span className='text-sm font-medium'>{quantity}</span>
      <Button
        type="round"
        onClick={() => disoatch(increaseItemQuantity(pizzID))}
      >
        +
      </Button>
    </div>
  );
};
