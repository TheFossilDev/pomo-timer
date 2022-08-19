import React from "react";
import { useSelector } from "react-redux";
import styles from "./Footer.module.css";

import BMC from "../Icons/BMC";

const Footer = (props) => {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={styles.footer}>
      {darkMode ? (
        <p className={styles.textWhite}>Made with 🤍 by Fossil</p>
      ) : (
        <p className={styles.text}>Made with 🖤 by Fossil</p>
      )}
      <div className={styles.coffeeContainer}>
        {darkMode ? (
          <a
            href="https://www.buymeacoffee.com/fossil"
            target="_blank"
            rel="noopener"
            className={styles.textWhite}
          >
            Buy me a
          </a>
        ) : (
          <a
            href="https://www.buymeacoffee.com/fossil"
            target="_blank"
            rel="noopener"
            className={styles.text}
          >
            Buy me a
          </a>
        )}
        <BMC className={`${styles.coffee} ${darkMode ? styles.darkFill : null}`} />
      </div>
    </div>
  );
};

export default Footer;
