import { FC } from 'react';
import { Header } from './Header';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import { Loader } from './Loader';

export const AppLayout: FC = () => {
  const navigation = useNavigation();
  console.log(navigation);
  const isLoading = navigation.state === 'loading';
  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      <div className="overflow-scroll">
        <main className="mx-auto max-w-full">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
};
