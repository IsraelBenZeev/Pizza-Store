import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import { RootState } from '../utils/store';
import { Button } from './Button';

function Home() {
  const username = useSelector<RootState, string>(
    (state) => state.user.username,
  );
  return (
    <div className="my-10 px-4 text-center">
      <h1 className="mb-8 text-xl font-semibold text-stone-700 md:text-3xl">
        The best pizza
        <br />
        <span className="text-yellow-500">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        // <div className="w-10 border border-green-500">ABCDEFG</div>
        <Button type="primery" to="/menu">
          Go to menu
        </Button>
      )}
    </div>
  );
}

export default Home;
