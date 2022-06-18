import React from 'react';
import styles from './modalOverlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({ onClick }) => {
   return (
      <div className={styles.modalOverlay} onClick={onClick}></div>
   );
};

ModalOverlay.propTypes = {
   onClick: PropTypes.func.isRequired,
};

export default ModalOverlay;