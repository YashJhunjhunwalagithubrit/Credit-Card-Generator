import React from 'react';

import styles from './Header.module.css';

function Header(props) {
  const { name, number, expMonth, expYear, cvc } = props;

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.innerCardContainer}>
          {/* Credit Card - Back */}
          <div className={styles.cardBack}>
            <div className={styles.backCardContainer}>
              <p>{cvc ? cvc : '000'}</p>
            </div>
          </div>
          {/* Credit Card - Front */}
          <div className={styles.cardFront}>
            <div className={styles.frontCardContainer}>
              <div className={styles.upperLine}>
                <span className={styles.dot} />
                <span className={styles.circleOutline} />
              </div>
              <div>
                <div className={styles.cardNumber}>
                  {number ? number : '0000 0000 0000 0000'}
                </div>
                <div className={styles.lowerLine}>
                  <p>{name ? name.toUpperCase() : 'JANE APPLESEED'}</p>
                  <p>{`${expMonth ? expMonth : '00'}/${
                    expYear ? expYear : '00'
                  }`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
