//@ts-nocheck

import React, { FC } from "react";
import styles from "./modalOverlay.module.css";
import PropTypes from "prop-types";

type TModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<TModalOverlayProps> = ({ onClick }) => {
  return <div className={styles.modalOverlay} onClick={onClick}></div>;
};

ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
