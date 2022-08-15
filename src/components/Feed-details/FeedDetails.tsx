import { useEffect } from "react";
import styles from "./feedDetails.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import FeedDetailsElement from "./Feed-details-element/FeedDetailsElement";
import { useParams, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getIngredient, calculateOrderTime } from "../../utils/utils";
import {
  wsConnectionClose,
  wsConnectionStart,
} from "../../services/actions/wsActions";
import { getCookie } from "../API/api";
import { TOrder } from "../../services/types";
import { useDispatchHook, useSelectorHook } from "../../services/types/index";

function FeedDetails() {
  const dispatch = useDispatchHook();
  const params: { id: string } = useParams();

  const { orders } = useSelectorHook((store) => store.wsReducer);
  const orderInfo = orders?.filter((el: TOrder) => el._id === params.id);
  const ingredientsArr = useSelectorHook((store) => store.ingredientsReducer);

  const { pathname } = useLocation();
  let arrDonor: Array<any> = [];

  const modalConnection = () => {
    if (pathname.includes("/feed/")) {
      dispatch(wsConnectionStart("/all"));
    }
    if (pathname.includes("/profile/order")) {
      dispatch(wsConnectionStart(`?token=${getCookie("token")?.slice(1)}`));
    }
    return;
  };

  useEffect(() => {
    setTimeout(() => {
      modalConnection();
    }, 0.5);
    return () => {
      dispatch(wsConnectionClose());
    };
  }, []);

  const setArray = (orderInfo: Array<TOrder>) => {
    if (orderInfo) {
      orderInfo[0]?.ingredients.map((el) => {
        arrDonor.push({ id: el, amount: 1 });
      });
      filterOrderInfo(arrDonor);
    }
  };

  const filterOrderInfo = (orderArr: Array<{ id: string; amount: number }>) => {
    let element = orderArr;
    element?.map((el, idx) => {
      let counter = 0;
      for (let i = 0; i < element?.length; i++) {
        if (el.id === element[i].id) {
          counter++;
        }

        if (el.id === element[i].id && counter > 1) {
          element[idx].amount = element[idx].amount + 1;
          element?.splice(i, 1);

          arrDonor = element;
        }
      }
    });
  };

  if (orderInfo) {
    setArray(orderInfo);
  }

  const calculateOrderPrice = (orderArr: TOrder) => {
    let price: number = 0;

    orderArr?.ingredients.map((el_id) => {
      const ingredient = getIngredient(el_id, ingredientsArr);
      if (ingredient) {
        price += ingredient.price;
      }
    });
    return price;
  };

  return (
    <div className={styles.content}>
      <div className={styles.info}>
        <div className={styles.info__code}>
          <p className="text text_type_main-default pt-4">#</p>
          <p className="text text_type_digits-default pt-4 pb-10">
            {orderInfo && orderInfo[0] && orderInfo[0].number}
          </p>
        </div>
      </div>
      <p
        style={{ maxWidth: "450px", textAlign: "center" }}
        className="text text_type_main-medium pb-3"
      >
        {orderInfo && orderInfo[0] && orderInfo[0].name}
      </p>
      <p
        className="text text_type_main-default pb-15"
        style={{ color: "#00CCCC " }}
      >
        Выполнен
      </p>
      <p className="text text_type_main-default pb-6">Состав:</p>
      <div className={styles.detailsElements}>
        {arrDonor &&
          arrDonor.map((el) => {
            return <FeedDetailsElement ingredient={el} key={uuidv4()} />;
          })}
      </div>
      <div className={styles.feedDetails__summary}>
        <p className="text text_type_main-default text_color_inactive pt-10">
          {orderInfo &&
            orderInfo[0] &&
            calculateOrderTime(orderInfo[0].createdAt)}
        </p>
        <div className={styles.feedDetails__priceBlock}>
          <p className="text text_type_digits-default pb-4">
            {orderInfo && calculateOrderPrice(orderInfo[0])}
          </p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeedDetails;
