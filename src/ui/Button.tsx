import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
type ButtonProps = {
  children: ReactNode;
  disabled?: boolean;
  to?: string;
  type: 'primery' | 'small' | 'secondary';
  onClick?: () => void;
};
export const Button: FC<ButtonProps> = ({
  children,
  disabled,
  to,
  type,
  onClick,
}) => {
  // const clasName =
  //   'rounded-full bg-yellow-400 px-4 py-3 font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed sm:px-4 sm:py-6';
  const base =
    'rounded-full bg-yellow-400 text-sm font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed';
  const styles = {
    primery: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    secondary:
      'text-sm rounded-full border-2 border-stone-300 font-semibold tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:ring focus:ring-yellow-300 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed px-4 py-2 md:px-5 md:py-2.5 text-xs',
  };

  if (to) {
    return (
      <Link className={styles[type]} to={to}>
        {children}
      </Link>
    );
  }
  if (onClick) {
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );
  }
  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
};
