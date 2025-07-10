import { FC, FormEvent, useState } from 'react';
import {
  ActionFunctionArgs,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../service/apiRestaurant';
import { OrderType } from '../../types/Order';
import { Button } from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { dispatchAsync, RootState } from '../../utils/store';
import EmptyCart from '../cart/EmptyCart';
import store from '../../utils/store';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import { fetchAddress } from '../user/userSlice';
import { UserSliceType } from '../../types/UserSliceType';
import { IoLocationOutline } from 'react-icons/io5';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

export const CreateOrder: FC = () => {
  const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData() as { [key: string]: string };
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  const cart = useSelector<RootState>((state) => state.cart.cart);
  const {
    address,
    status: addressStatus,
    position,
    username,
    error: errorAddress,
  } = useSelector<RootState, UserSliceType>((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const totalCartPrice = useSelector<RootState, number>(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const dispatch = useDispatch();

  console.log('cart: ', cart);
  if (!cart.length) return <EmptyCart />;

  // const cart = fakeCart;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            defaultValue={username}
            className="input w-full"
            type="text"
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 w-fit rounded-full bg-red-100 p-1 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:items-center">
          <div className="flex w-full flex-row items-center gap-2">
            <label className="sm:basis-40">Address</label>
            <div className="flex grow items-center gap-2">
              <input
                className="input w-full"
                type="text"
                name="address"
                required
                defaultValue={
                  position?.latitude && position?.longitude ? `${address}` : ''
                }
              />
              {!position?.latitude && !position?.longitude && (
                <Button
                  type="small"
                  disabled={isLoadingAddress || isSubmitting}
                  onClick={(e: FormEvent<SubmitEvent>) => {
                    e.preventDefault();
                    dispatchAsync(fetchAddress());
                  }}
                >
                  {isLoadingAddress ? (
                    'loading...'
                  ) : (
                    <div className="flex flex-col items-center">
                      <IoLocationOutline className="h-6 text-xl" />
                      {/* <p className='text-[8px]'>Your loacation</p> */}
                    </div>
                  )}
                </Button>
              )}
            </div>
          </div>
          <div className="">
            {addressStatus === 'error' && (
              <p className="mt-2 w-fit rounded-full bg-red-100 p-1 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>
        <div>
          <input
            type="hidden"
            name="position"
            value={`${position?.latitude}, ${position?.longitude}`}
          />
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primery">
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  console.log('entert to action of order/new');
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: string;
  };
  const order: OrderType = {
    ...data,
    cart: data.cart ? JSON.parse(data.cart) : [],
    priority: data.priority === 'true',
  };
  console.log('order: ', order);
  const errors: { [key: string]: string } = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      'Please give us your correct phon number. We might need it to conect you.';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
};
