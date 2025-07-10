import { FC } from 'react';
import { Button } from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { deleteItem } from './cartSlice';

export const DeleteItem: FC<{ id: number }> = ({ id }) => {
  const dispatch = useDispatch();
  return (
    <Button onClick={() => dispatch(deleteItem(id))} type="small">
      Delete
    </Button>
  );
};
