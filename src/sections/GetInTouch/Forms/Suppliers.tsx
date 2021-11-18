import React from "react";
import classNames from "classnames";
import Button from "@components/Common/Button/Button";
import Checkbox from "@components/Common/Checkbox/Checkbox";
import Input from "@components/Common/Input/Input";
import RadioButtons from "@components/Common/RadioButtons/RadioButtons";
import Select from "@components/Common/FormSelect/FormSelect";
import Textarea from "@components/Common/Textarea/Textarea";

import styles from "./forms.module.scss";

export interface SuppliersProps {}

const Suppliers = () => {
  const radioButtonsData = [
    {
      value: "1 – 3",
      text: "1 – 3",
    },
    {
      value: "4 - 8",
      text: "4 - 8",
    },
    {
      value: "9 - 12",
      text: "9 - 12",
    },
  ];
  const serviceTypes: any = [];
  const workingAreas: any = [];

  return (
    <form className={classNames(styles.Form)}>
      <div className={styles.formRow}>
        <div className={styles.formCol}>
          <Input
            type="text"
            name="firstName"
            className={styles.formControl}
            placeholder="First Name"
          />
          <Input
            type="text"
            name="lastName"
            className={styles.formControl}
            placeholder="Last Name"
          />
          <Input
            type="email"
            name="email"
            className={styles.formControl}
            placeholder="Email"
          />
          <Input
            type="text"
            name="contactNumber"
            className={styles.formControl}
            placeholder="Contact Number"
          />
          <Input
            type="text"
            name="postcode"
            className={styles.formControl}
            placeholder="Postcode"
          />
          <Textarea
            rows={3}
            className={styles.formControl}
            name="comment"
            placeholder="Comment"
          />
        </div>
        <div className={styles.formCol}>
          <div>
            <Select
              className={styles.formControl}
              name="serviceType"
              placeholder="What type of services do you provide?"
              options={serviceTypes}
            />
            <Select
              className={styles.formControl}
              name="workingArea"
              placeholder="What area are you interested in working from?"
              options={workingAreas}
            />
          </div>
          <div>
            <h6>How big is your company?</h6>
            <RadioButtons
              className={styles.formControl}
              name="employees"
              data={radioButtonsData}
            />
          </div>
        </div>
      </div>
      <div className={styles.formRow}>
        <div className={styles.formCol}>
          <Checkbox
            className={styles.formControl}
            name="terms"
            text="By clicking submit you acknowledge Allam may contact you via
              email, you also agree to their Terms and Conditions."
          />
          <Checkbox
            className={styles.formControl}
            name="offers"
            text="Would you like to receive updates and offers from Allam Property
              Group?"
          />
          <Button className={styles.formControl} color="dark">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Suppliers;
