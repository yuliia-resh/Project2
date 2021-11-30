import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { setError } from "../../../Redux/Reducers";
import { useCustomSelector } from "../../../Redux/Store";

import { departmentsSelect } from "../../../constants/select";
import { updateAppointmentApi } from "../../../api";

import { ErrorMessage, Form, Formik } from "formik";
import { DatePicker, TimePicker, Input, AutoComplete } from "formik-antd";
import { Button } from "antd";
import styles from "./AppointmentEdit.module.scss";
import { Option } from "antd/lib/mentions";

export default function AppointemntEdit() {
  const { currentAppointment } = useCustomSelector(
    (state) => state.appointmentReducer
  );

  const dispatch = useDispatch();
  const history = useHistory();

  const onCancelClick = () => {
    history.goBack();
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
            time: currentAppointment?.time,
            department: currentAppointment?.department,
            number: currentAppointment?.number,
            notes: currentAppointment?.notes,
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.firstName) {
              errors.name = "Required";
              // } else if (
              //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              // ) {
              //   errors.name = "Invalid email address";
              // }
              return errors;
            }
          }}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              setSubmitting(false);
              await updateAppointmentApi({
                id: currentAppointment.id,
                ...values,
                status: currentAppointment.status,
              });
              console.log(values);
              alert("Updated successfully!");
            } catch (error: any) {
              alert("Something went wrong(");
              dispatch(setError(error.message));
            } finally {
              setSubmitting(true);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.column}>
                <p>First name *</p>
                <Input.TextArea name="firstName" className={styles.input} />
                <ErrorMessage name="name" component="div" />

                <p>Appointment date *</p>
                <DatePicker
                  name="date"
                  format="DD/MM/YYYY"
                  className={styles.input}
                />
                <ErrorMessage name="date" component="div" />

                <TimePicker
                  name="time"
                  className={styles.input}
                  format="hh:mm"
                />
                <ErrorMessage name="time" component="div" />

                <p>Department *</p>
                <AutoComplete
                  name="department"
                  dataSource={departmentsSelect}
                  className={styles.input}
                  showArrow
                >
                  {departmentsSelect.map((dep, index) => {
                    return (
                      <Option key={`${index}`} value={dep}>
                        {dep}
                      </Option>
                    );
                  })}
                </AutoComplete>
              </div>
              <div className={styles.column}>
                <p>Second name *</p>
                <Input.TextArea name="secondName" className={styles.input} />
                <ErrorMessage name="secondName" component="div" />

                <p>Phone number *</p>
                <Input.TextArea name="number" className={styles.input} />
                <ErrorMessage name="number" component="div" />

                <p>Notes</p>
                <Input.TextArea name="notes" className={styles.input} />
                <ErrorMessage name="notes" component="div" />
                {currentAppointment.id && (
                  <>
                    <Button
                      disabled={isSubmitting}
                      type="primary"
                      htmlType="submit"
                      className={styles.button}
                    >
                      Submit
                    </Button>
                    <Button onClick={onCancelClick}>Cancel</Button>
                  </>
                )}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
