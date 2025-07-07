import { useNavigate, useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

export const Error = () => {
  const navigate = useNavigate();
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <LinkButton to='-1'>&larr; Go back</LinkButton>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
    </div>
  );
};
