import { useDispatch, useSelector } from 'react-redux';
import Heading from '../../components/Heading/Heading';
import { RootState } from '../../store/store';
import CartItem from '../../components/CartItem/CartItem';
import { useEffect, useState } from 'react';
import { PREFIX } from '../../helpers/API';
import axios from 'axios';
import { IProduct } from '../../interfaces/product.interface';
import styles from './Cart.module.css';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { cartActions } from '../../store/cart.slice';

const DELIVERY_FEE = 169;

function Cart() {
  const [cartProducts, setCartProducts] = useState<IProduct[]>([]);
  const items = useSelector((s: RootState) => s.cart.items);
  const jwt = useSelector((s: RootState) => s.user.jwt);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAllItems = async () => {
      const res = await Promise.all(items.map((i) => getItem(i.id)));
      setCartProducts(res);
    };

    loadAllItems();
  }, [items]);

  const getItem = async (id: number) => {
    const { data } = await axios.get<IProduct>(`${PREFIX}/products/${id}`);
    return data;
  };

  const total = items
    .map((i) => {
      const product = cartProducts.find((p) => p.id === i.id);
      if (!product) {
        return 0;
      }

      return i.count * product.price;
    })
    .reduce((acc, i) => (acc += i), 0);

  const checkout = async () => {
    axios.post(
      `${PREFIX}/order`,
      { products: items },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch(cartActions.clean());
    navigate('/success');
  };

  return (
    <>
      <Heading className={styles['heading']}>Корзина</Heading>
      {items.map((i) => {
        const product = cartProducts.find((p) => p.id === i.id);
        if (!product) {
          return;
        }

        return <CartItem count={i.count} key={i.id} {...product} />;
      })}

      <div className={styles['line']}>
        <div className={styles['text']}>Итог</div>
        <div className={styles['price']}>
          {total}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>Доставка </div>
        <div className={styles['price']}>
          {DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <hr className={styles['hr']} />
      <div className={styles['line']}>
        <div className={styles['text']}>
          Итог <span className={styles['total-count']}>({items.length})</span>
        </div>
        <div className={styles['price']}>
          {total + DELIVERY_FEE}&nbsp;<span>₽</span>
        </div>
      </div>
      <div className={styles['checkout']}>
        <Button appearence="big" onClick={checkout}>
          Оформить
        </Button>
      </div>
    </>
  );
}

export default Cart;
