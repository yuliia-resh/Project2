import { Dispatch, SetStateAction } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setError } from "../../../Redux/Reducers";
import { useCustomSelector } from "../../../Redux/Store";

import * as Yup from "yup";
import { departmentsSelect } from "../../../constants/select";
import { updateAppointmentApi } from "../../../api";

import { Form, Formik } from "formik";
import { DatePicker, TimePicker, Input, AutoComplete } from "formik-antd";
import { Button } from "antd";
import { Option } from "antd/lib/mentions";
import styles from "./AppointmentForm.module.scss";

const phoneRegExp = /^\(\d{3}\)\-\d{3}\-\d{4}$/;

const Validation = Yup.object().shape({
  firstName: Yup.string().max(100, "Too long!").required("Required"),
  secondName: Yup.string().max(100, "Too long!").required("Required"),
  date: Yup.mixed().required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Type phone number in (###)-###-#### format!")
    .required("Required"),
  department: Yup.string().required("Required"),
  notes: Yup.string().max(1000, "Too long!").optional(),
});

export default function AppointemntForm(props: any) {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const onCancelClick = () => {
    currentAppointment.firstName
      ? history.goBack()
      : props.setModalVisible(false);
  };

  const handleUpdateSubmit = async (values: any) => {
    try {
      await updateAppointmentApi({
        id: currentAppointment.id,
        ...values,
        date: new Date(values.date).valueOf(),
        status: currentAppointment.status,
      });
      alert("Updated successfully!");
    } catch (error: any) {
      alert("Something went wrong(");
      dispatch(setError(error.message));
    }
  };

  return (
    <>
      {currentAppointment.id && (
        <p className={styles.title}>
          Edit Appointment #{currentAppointment.id}
        </p>
      )}
      <div className={styles.editWrapper}>
        <Formik
          initialValues={{
            firstName: currentAppointment?.firstName,
            secondName: currentAppointment?.secondName,
            date: currentAppointment?.date,
            department: currentAppointment?.department,
            number: currentAppointment?.number,
            notes: currentAppointment?.notes,
          }}
          validationSchema={Validation}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            props.handleAddSubmit
              ? props.handleAddSubmit(values)
              : handleUpdateSubmit(values);
            setSubmitting(true);
          }}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              <div className={styles.column}>
                <p>First name *</p>
                <Input.TextArea
                  name="firstName"
                  className={styles.input}
                  placeholder="Enter first name"
                />
                {errors.firstName && touched.firstName && (
                  <p className={styles.error}>{errors.firstName}</p>
                )}

                <p>Appointment date *</p>
                <DatePicker
                  name="date"
                  format="DD/MM/YYYY"
                  className={styles.input}
                  placeholder="__/__/____"
                />
                {errors.date && touched.date && (
                  <p className={styles.error}>{errors.date}</p>
                )}

                <TimePicker
                  name="date"
                  className={styles.input}
                  format="hh:mm"
                  placeholder="__:__"
                />
                {errors.date && touched.date && (
                  <p className={styles.error}>{errors.date}</p>
                )}

                <p>Department *</p>
                <AutoComplete
                  name="department"
                  dataSource={departmentsSelect}
                  className={styles.input}
                  showArrow
                  placeholder="Select department"
                >
                  {departmentsSelect.map((dep, index) => {
                    return (
                      <Option key={`${index}`} value={dep}>
                        {dep}
                      </Option>
                    );
                  })}
                </AutoComplete>
                {errors.department && touched.department && (
                  <p className={styles.error}>{errors.department}</p>
                )}
              </div>
              <div className={styles.column}>
                <p>Second name *</p>
                <Input.TextArea
                  name="secondName"
                  className={styles.input}
                  placeholder="Enter second name"
                />
                {errors.secondName && touched.secondName && (
                  <p className={styles.error}>{errors.secondName}</p>
                )}

                <p>Phone number *</p>

                <Input.TextArea
                  name="number"
                  className={styles.input}
                  placeholder="(___)-___-____"
                />
                {errors.number && touched.number && (
                  <p className={styles.error}>{errors.number}</p>
                )}

                <p>Notes</p>
                <Input.TextArea
                  name="notes"
                  className={styles.input}
                  placeholder="Enter notes"
                />
                {errors.notes && touched.notes && (
                  <p className={styles.error}>{errors.notes}</p>
                )}

                <Button
                  disabled={isSubmitting}
                  type="primary"
                  htmlType="submit"
                  className={styles.button}
                >
                  Submit
                </Button>
                <Button onClick={onCancelClick}>Cancel</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
