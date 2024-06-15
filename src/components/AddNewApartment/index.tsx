import React from "react";
import styles from "./styles.module.css";

const daysOptions = ["1", "2", "3+"];

export const AddNewApartment = () => {
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <section>
      <form className={styles.container} onSubmit={onSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            type="text"
            name="title"
            className={styles.input}
            placeholder="Ex. Flat in the city center"
          />
        </div>

        <div className={styles.days}>
          <label htmlFor="days" className={styles.label}>
            Days
          </label>
          <input
            type="text"
            name="days"
            className={styles.input}
            placeholder="4"
          />
        </div>

        <div className={styles.days}>
          <label htmlFor="beds" className={styles.label}>
            Beds
          </label>
          <select name="beds" className={styles.select}>
            {daysOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.price}>
          <label htmlFor="rent" className={styles.label}>
            Rent Price
          </label>
          <input
            type="text"
            name="rent"
            className={styles.input}
            placeholder="99.00"
          />
        </div>
        <button className={styles.button}>Submit rent</button>
      </form>
    </section>
  );
};
