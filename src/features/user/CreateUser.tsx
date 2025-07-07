import { FormEvent, useState } from 'react';
import { Button } from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { updateName } from './userSlice';
import { useNavigate } from 'react-router-dom';

function CreateUser() {
  const [username, setUsername] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!username) return;
    dispatch(updateName(username));
    navigate('/menu');
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="mb-4 text-sm text-stone-600 md:text-base">
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        className="input mb-8 w-72"
        type="text"
        placeholder="Your full name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {username !== '' && (
        <div>
          <Button type="primery">Start ordering</Button>
          {/* <button>Start ordering</button> */}
        </div>
      )}
    </form>
  );
}

export default CreateUser;
