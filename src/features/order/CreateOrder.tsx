import { FC } from 'react';
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
import { useSelector } from 'react-redux';
import { RootState } from '../../utils/store';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

export const CreateOrder: FC = () => {
  // const [withPriority, setWithPriority] = useState(false);
  const formErrors = useActionData() as { [key: string]: string };
  const navigation = useNavigation();
  const username = useSelector<RootState, string>((state) => state.user.username);
  const isSubmitting = navigation.state === 'submitting';
  const cart = fakeCart;

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

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              required
            />
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-semibold">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <Button disabled={isSubmitting} type="primery">
            {isSubmitting ? 'Placing order...' : 'Order now'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export const actiion = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData) as {
    [key: string]: string;
  };
  const order: OrderType = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'on',
  };
  console.log('order: ', order);
  const errors: { [key: string]: string } = {};
  if (!isValidPhone(data.phone))
    errors.phone =
      'Please give us your correct phon number. We might need it to conect you.';
  if (Object.keys(errors).length > 0) return errors;
  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
};
