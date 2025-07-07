import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../utils/store';

export const Username: FC = () => {
  const username = useSelector<RootState, string>(
    (state) => state.user.username,
  );
  if (!username) return null;
  return (
    <div className="hidden text-sm font-semibold sm:block">{username}</div>
  );
};
