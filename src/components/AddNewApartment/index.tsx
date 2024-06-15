import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import styles from "./styles.module.css";

interface FormData {
  title: string;
  days: string;
  beds: string;
  price: string;
}

const daysOptions = ["1", "2", "3+"];

export const AddNewApartment = () => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <section>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            {...register("title", { required: true })}
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
            {...register("days", { required: true })}
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
          <select {...register("beds")} name="beds" className={styles.select}>
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
            {...register("price", { required: true })}
            type="text"
            name="price"
            className={styles.input}
            placeholder="99.00"
          />
        </div>
        <button className={styles.button}>Submit rent</button>
      </form>
    </section>
  );
};
