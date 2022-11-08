import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import FeedStatus from "../components/Feed-status/FeedStatus";
import {
  wsConnectionClose,
  wsConnectionStart,
} from "../services/actions/wsActions";
import FeedOrder from "../components/Feed-order/FeedOrder";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./feed.module.css";
import { calculateOrderTime } from "../utils/utils";
import { resetTab, setTab } from "../services/actions/tabs";
import { useDispatchHook, useSelectorHook } from "../services/types/index";
import { TOrder } from "../services/types";

function Feed() {
  const dispatch = useDispatchHook();
  const history = useHistory();
  const location = useLocation();
  const { orders } = useSelectorHook((store) => store.wsReducer);

  useEffect(() => {
    dispatch(wsConnectionStart("/all"));
    dispatch(resetTab());
    dispatch(setTab("orderFeed"));
    return () => {
      dispatch(wsConnectionClose());
    };
  }, [dispatch]);

  const handleFeedClick = (order: TOrder) => {
    history.replace({
      pathname: `/feed/${order._id}`,
      state: { background: location },
    });
  };

  return (
    <div className={styles.content}>
      <div className={styles.orders}>
        <p className="text text_type_main-large pb-6">Лента заказов</p>
        {orders &&
          orders.map((orderEl) => (
            <FeedOrder
              order={orderEl}
              handleFeedClick={handleFeedClick}
              key={uuidv4()}
              time={calculateOrderTime(orderEl.createdAt)}
            />
          ))}
      </div>
      <FeedStatus orders={orders ? orders : []} />
    </div>
  );
}

export default Feed;
