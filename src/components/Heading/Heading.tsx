import { HeadingProps } from './Heading.props';
import cn from 'classnames';
import styles from './Heading.module.css';

function Heading({ children, className, ...props }: HeadingProps) {
  return (
    <div className={cn(styles['h1'], className)} {...props}>
      {children}
    </div>
  );
}

export default Heading;
