import LinkButton from '../../ui/LinkButton';
import { Button } from '../../ui/Button';
import CartItem from './CartItem';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../utils/store';
import { OrderCartType } from '../../types/orderCart';
import { clearCart } from './cartSlice';
import EmptyCart from './EmptyCart';
const Cart: FC = () => {
  const username = useSelector<RootState, string>(
    (state) => state.user.username,
  );
  const cart = useSelector<RootState, OrderCartType[]>((state) => state.cart.cart);
  const dispatch = useDispatch();
  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu"> &larr; Back to menu</LinkButton>
      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>
      <ul className="mt-3 divide-y divide-stone-200 border-b border-stone-200">
        {cart.map((el) => (
          <CartItem item={el} key={el.pizzaId} />
        ))}
      </ul>
      <div className="mt-6 space-x-2">
        <Button type="small" to="/order/new">
          Order pizzas
        </Button>
        <Button type="secondary" onClick={() => dispatch(clearCart())}>
          Clear cart
        </Button>
      </div>
    </div>
  );
};

export default Cart;
