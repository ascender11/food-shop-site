import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Heading from '../../components/Heading/Heading';
import styles from './Product.module.css';
import { IProduct } from '../../interfaces/product.interface';
import axios, { AxiosError } from 'axios';
import { MouseEvent, useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart.slice';

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const dispatch = useDispatch();

  const add = (e: MouseEvent) => {
    e.preventDefault();
    dispatch(cartActions.increase(Number(id)));
  };

  useEffect(() => {
    getProduct(Number(id));
  }, [id]);

  const getProduct = async (id: number) => {
    try {
      const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);

      if (!data) {
        throw new Error('No data');
      }

      setProduct(data);
    } catch (e) {
      console.error(e);
      if (e instanceof AxiosError) {
        console.error(e.message);
      }
      return;
    }
  };

  return (
    <div className={styles['product']}>
      <div className={styles['header']}>
        <Link to="/" className={styles['arrow']}>
          <img src="/arrow-left.svg" alt="" />
        </Link>
        <Heading>{product?.name}</Heading>
        <Button className={styles['button']} onClick={add}>
          <img src="/add-to-cart-icon.svg" alt="Иконка корзины" />
          <span>В корзину</span>
        </Button>
      </div>
      <div className={styles['card']}>
        <div
          className={styles['image']}
          style={{
            backgroundImage: `url('${product?.image}')`,
          }}
        ></div>
        <div className={styles['description']}>
          <div className={styles['line']}>
            <div className={styles['text']}>Цена</div>
            <div className={styles['price']}>
              {product?.price}&nbsp;
              <span className={styles['currency']}>₽</span>
            </div>
          </div>
          <hr className={styles['hr']} />
          <div className={styles['line']}>
            <div className={styles['text']}>Рейтинг</div>
            <div className={styles['rating']}>
              {product?.rating}&nbsp;
              <img src="/star-icon.svg" alt="Иконка звезды" />
            </div>
          </div>
          <div className={styles['composition']}>
            <div>Состав:</div>
            <ul className={styles['list']}>
              {product?.ingredients.map((i, index) => (
                <li key={index}>{i.charAt(0).toUpperCase() + i.slice(1)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
