import { FC } from 'react';
import { Button } from '../../ui/Button';
import { ActionFunctionArgs, useFetcher } from 'react-router-dom';
import { OrderType } from '../../types/Order';
import { updateOrder } from '../../service/apiRestaurant';

export const UpdateOrder: FC<{ order: OrderType }> = ({ order }) => {
  const fetcher = useFetcher();
  const isLoading = fetcher.state === 'loading';
  return (
    <fetcher.Form
      method="PATCH"
      className="text-right"
      action={`/order/${order?.id}`}
    >
      <Button type="primery">{isLoading ? 'Updating...': 'Make priority'}</Button>
    </fetcher.Form>
  );
};
export const action = async ({ params }: ActionFunctionArgs) => {
  console.log('update');
  const data = { priority: true };
  await updateOrder(params.orderID, data);
  return null;
};
