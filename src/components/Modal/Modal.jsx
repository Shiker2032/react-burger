import React from "react";
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./modal.module.css";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";

const reactModalContainer = document.querySelector("#modals");

const Modal = ({ onCloseClick, children }) => {
  React.useEffect(() => {
    document.addEventListener("keydown", onEsckeyDown);
    return () => {
      document.removeEventListener("keydown", onEsckeyDown);
    };
  }, []);

  const onEsckeyDown = (event) => {
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
    reactModalContainer
  );
};

Modal.propTypes = {
  onCloseClick: PropTypes.func.isRequired,
  onEsckeyDown: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

export default Modal;
