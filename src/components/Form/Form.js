import React, { useEffect, useState } from 'react';
import successIcon from '../../assets/icon-complete.svg';
import styles from './Form.module.css';

function Form(props) {
  const initialValues = { name: '', number: '', month: '', year: '', cvc: '' };

  const [completeState, setCompleteState] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const { onFormChange } = props;

//   useEffect(() => {
//     onFormChange(values);
//   }, [onFormChange, values]);

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      await new Promise((r) => setTimeout(r, 500));
      setCompleteState(true);
      onFormChange(values);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const formErrors = {};

    if (!values.name) {
      formErrors.name = `Can't be blank`;
    }

    if (!values.number || !isValidCreditCardNumber(values.number)) {
      formErrors.number = 'Credit Card number is invalid';
    }

    if (!values.month || !isValidMonth(values.month)) {
      formErrors.month = 'Month is Invalid';
    }

    if (!values.year || !isValidYear(values.year)) {
      formErrors.year = 'Year is invalid';
    }

    if (!values.cvc || !isValidCVC(values.cvc)) {
      formErrors.cvc = 'CVC is invalid';
    }

    return formErrors;
  };

  const isValidCreditCardNumber = (number) => {
     return number.length === 16 && /^\d+$/.test(number);
  };

  const isValidMonth = (month) => {
     return /^\d+$/.test(month) && parseInt(month, 10) >= 1 && parseInt(month, 10) <= 12;
  };

  const isValidYear = (year) => {
         return /^\d+$/.test(year) && year.length === 2;
  };

  const isValidCVC = (cvc) => {
         return /^\d+$/.test(cvc) && cvc.length === 3;
  };

  return (
    <div className={styles.formBox}>
      {completeState ? (
        <div>
          <img src={successIcon} alt="success" />
          <h1 className={styles.successHeading}>THANK YOU!</h1>
          <h3 className={styles.successDescription}>We've added your card details</h3>
          <button type="button" className={styles.confirmBtn}>
            Continue
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>CARDHOLDER NAME</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Jane Appleseed"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.name}
            maxLength={25}
          />
          {errors.name && touched.name && <p className={styles.error}>{errors.name}</p>}
          <label>CARD NUMBER</label>
          <input
            type="text"
            name="number"
            placeholder="e.g. 1234 5678 9123 0000"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.number}
          />
          {errors.number && touched.number && <p className={styles.error}>{errors.number}</p>}

          <div className={styles.date}>
            <div>
              <label>EXP. DATE (MM/YY)</label>
              <div className={styles.flexDiv}>
                <div>
                  <input
                    type="text"
                    placeholder="MM"
                    name="month"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.month}
                  />
                  {errors.month && touched.month && <p className={styles.error}>{errors.month}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="YY"
                    name="year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.year}
                  />
                  {errors.year && touched.year && <p className={styles.error}>{errors.year}</p>}
                </div>
              </div>
            </div>
            <div>
              <label>CVC</label>
              <input
                type="text"
                placeholder="e.g. 123"
                name="cvc"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.cvc}
              />
              {errors.cvc && touched.cvc && <p className={styles.error}>{errors.cvc}</p>}
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}  className={styles.confirmBtn}>
            Confirm
          </button>
        </form>
      )}
    </div>
  );
}

export default Form;
