import { FC } from "react";
import styles from "./modalOverlay.module.css";

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};

export default ModalOverlay;
