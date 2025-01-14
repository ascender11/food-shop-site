import ProductCard from '../../../components/ProductCard/ProductCard';
import { MenuListProps } from './MenuList.props';
import styles from './MenuList.module.css';

function MenuList({ products }: MenuListProps) {
  return (
    <div className={styles['wrapper']}>
      {products.map((p) => (
        <ProductCard
          key={p.id}
          name={p.name}
          description={p.ingredients.join(', ')}
          image={p.image}
          rating={p.rating}
          price={p.price}
          id={p.id}
        ></ProductCard>
      ))}
    </div>
  );
}

export default MenuList;
