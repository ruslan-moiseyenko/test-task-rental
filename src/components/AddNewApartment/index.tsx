import { useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { nanoid } from "nanoid";
import styles from "./styles.module.css";
import { FormData, RoomData } from "../../types/types";
import { AppContext, AppContextType } from "../../App";

const daysOptions = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3+" }
];

export const AddNewApartment = () => {
  const { setFreeApartments } = useContext(AppContext!) as AppContextType;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newApartment: RoomData = {
      id: nanoid(),
      ...data
    };

    setFreeApartments((prevData: RoomData[]) => [...prevData, newApartment]);
    reset();
  };

  return (
    <section>
      <h2 className={styles.title}>Add new apartment</h2>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.inputContainer}>
          <label htmlFor="title" className={styles.label}>
            Title
          </label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            name="title"
            className={styles.input}
            placeholder="Ex. Flat in the city center"
          />
          <p className={styles.error}>{errors.title?.message}</p>
        </div>

        <div className={styles.description}>
          <label htmlFor="description" className={styles.label}>
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required"
            })}
            name="description"
            className={styles.input}
            placeholder="Some words about the apartment..."
          />
          <p className={styles.error}>{errors.description?.message}</p>
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
              {...register("price", {
                required: '"Rent price" is required',
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Invalid price"
                }
              })}
              type="text"
              name="price"
              className={styles.input}
              placeholder="99.00"
            />
            <p className={styles.error}>{errors.price?.message}</p>
          </div>
        </div>
        <button className={styles.button}>Submit rent</button>
      </form>
    </section>
  );
};
