import { useLoaderData } from 'react-router-dom';
import { getMenu } from '../../service/apiRestaurant';
import { MenuItem as MenuItemType } from '../../types/MenuItem';
import { MenuItem } from './MenuItem';

export const loader = async () => {
  return await getMenu();
};
function Menu() {
  const menu = useLoaderData() as MenuItemType[];
  // console.log(menu);
  return (
    <ul className='divide-y divide-stone-200 px-2'>
      {menu.map((el) => (
        <MenuItem pizza={el} key={el.id} />
      ))}
    </ul>
  );
}

export default Menu;
