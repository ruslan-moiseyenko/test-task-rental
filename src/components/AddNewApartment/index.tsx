import React, { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { addLocalStorageData } from "../../utils/helpers";
import { FormData, RoomData } from "../../types/types";
import { AppContext, AppContextType } from "../../App";

const daysOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3+" }
];

export const AddNewApartment = () => {
  const { setData } = useContext(AppContext!) as AppContextType;

  const {
    handleSubmit,
    register,
    reset
    // formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newApartment: RoomData = {
      id: nanoid(),
      ...data
    };

    addLocalStorageData(newApartment);
    setData((prevData: RoomData[]) => [...prevData, newApartment]);
    reset();
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

        <div className={styles.description}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            name="description"
            className={styles.input}
            placeholder="Some words about the apartment..."
          />
        </div>

        <div className={styles.details}>
          <div className={styles.days}>
            <label htmlFor="rooms" className={styles.label}>
              Rooms
            </label>
            <select
              {...register("rooms")}
              name="rooms"
              className={styles.select}
            >
              {daysOptions.map((option, index) => (
                <option key={option.label + index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.price}>
            <label htmlFor="price" className={styles.label}>
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
        </div>
        <button className={styles.button}>Submit rent</button>
      </form>
    </section>
  );
};
