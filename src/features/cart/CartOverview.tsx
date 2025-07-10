import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTotalCartPrice, getTotalCartQuantity } from './cartSlice';
import { RootState } from '../../utils/store';
import { formatCurrency } from '../../utils/helpers';
import { FC } from 'react';

const CartOverview: FC = () => {
  // const totalPrice = useSelector(getTotalCartPrice);
  const totalPrice = useSelector<RootState, number>((state) =>
    getTotalCartPrice(state),
  );
  const totalQuantity = useSelector<RootState, number>((state) =>
    getTotalCartQuantity(state),
  );
  if (!totalQuantity) return null;
  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantity} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to={'/cart'}>Open cart &rarr;</Link>
    </div>
  );
};

export default CartOverview;
