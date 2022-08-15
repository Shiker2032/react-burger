import React, { FC } from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const reactModalContainer = document.querySelector("#modals");

type TModalProps = {
  onCloseClick: () => void;
  children: React.ReactNode;
};

const Modal: FC<TModalProps> = ({ onCloseClick, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEsckeyDown);
    return () => {
      document.removeEventListener("keydown", onEsckeyDown);
    };
  }, []);

  const onEsckeyDown = (event: KeyboardEvent) => {
    event.key === "Escape" && onCloseClick();
  };

  return createPortal(
    <>
      <div className={styles.modal}>
        <button className={styles.modal__closeButton} type="button">
          <CloseIcon type="primary" onClick={onCloseClick} />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onCloseClick} />
    </>,
    reactModalContainer!
  );
};

Modal.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
