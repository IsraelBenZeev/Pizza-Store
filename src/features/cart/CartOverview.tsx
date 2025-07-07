import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../utils/store';
import { OrderCartType } from '../../types/orderCart';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);
  const quantity = useSelector(getTotalCartQuantity);


  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{quantity} pizzas</span>
        <span>{totalPrice}</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
