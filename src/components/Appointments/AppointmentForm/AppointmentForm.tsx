import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import InputMask from "react-input-mask";
import {
  getCurrentAppointment,
  getDepartments,
  updateAppointment,
} from "../../../redux/reducers/AppointmentSlice";
import { RootState } from "../../../redux/store";

import * as Yup from "yup";
import Loading from "../../Loading";

import { AppointmentType } from "../../../types";

import { Form, Formik } from "formik";
import { DatePicker, TimePicker, Input, AutoComplete } from "formik-antd";
import { Button } from "antd";
import { Option } from "antd/lib/mentions";
import styles from "./AppointmentForm.module.scss";
import classNames from "classnames";
import dayjs from "dayjs";

const phoneClassNames = classNames(styles.phoneNumber, styles.input);

const phoneRegExp = /^\d{10}$/;

const validation = Yup.object().shape({
  firstName: Yup.string().max(100, "Too long!").required("Required"),
  secondName: Yup.string().max(100, "Too long!").required("Required"),
  date: Yup.mixed().required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Type 10 numbers!")
    .required("Required"),
  department: Yup.string().required("Required"),
  notes: Yup.string().max(1000, "Too long!").optional(),
});

type PropsType = {
  setModalVisible: Dispatch<SetStateAction<boolean>>;
  handleAddSubmit?: (values: AppointmentType) => void;
};

export default function AppointemntForm(props: PropsType) {
  const [isLoading, setLoading] = useState(false);
  const [currentAppointment, setCurrentAppointment] =
    useState<AppointmentType>();

  const departmentsSelector = (state: RootState) => {
    return state.appointmentReducer.departments;
  };
  const departments = useSelector(departmentsSelector);

  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const action: any = await dispatch(getCurrentAppointment(+params.id));
        setCurrentAppointment(action.payload);
      } catch {
        alert("Something went wrong(");
      } finally {
        setLoading(false);
      }
    };

    if (!props.handleAddSubmit) {
      getData();
    }

    dispatch(getDepartments());
  }, [dispatch, params.id, props.handleAddSubmit]);

  const onCancelClick = () => {
    currentAppointment ? history.goBack() : props.setModalVisible(false);
  };

  const handleUpdateSubmit = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(
        updateAppointment({
          id: currentAppointment?.id as number,
          firstName: values.firstName.trim(),
          secondName: values.secondName.trim(),
          date: dayjs(values.date).valueOf(),
          number: values.number,
          department: values.department,
          status: currentAppointment?.status as string,
          notes: values.notes.trim(),
        })
      );
      alert("Updated successfully!");
    } catch {
      alert("Something went wrong(");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (values: any) => {
    props.handleAddSubmit
      ? props.handleAddSubmit(values)
      : handleUpdateSubmit(values);
  };

  return (
    <>
      {isLoading && !currentAppointment && <Loading />}

      {!isLoading && (props.handleAddSubmit || currentAppointment) && (
        <>
          {currentAppointment?.id && (
            <p className={styles.title}>
              Edit Appointment #{currentAppointment?.id}
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
              validationSchema={validation}
              onSubmit={onSubmit}
              validateOnBlur
            >
              {({ isSubmitting, errors, touched, setFieldValue }) => (
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
                      format="HH:mm"
                      placeholder="__:__"
                    />
                    {errors.date && touched.date && (
                      <p className={styles.error}>{errors.date}</p>
                    )}

                    <p>Department *</p>
                    <AutoComplete
                      name="department"
                      dataSource={departments}
                      className={styles.input}
                      showArrow
                      placeholder="Select department"
                    >
                      {departments.map((dep, index) => {
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

                    <InputMask
                      className={phoneClassNames}
                      placeholder="(___)-___-____"
                      mask="(999)-999-9999"
                      defaultValue={currentAppointment?.number}
                      name="number"
                      onChange={(e) => {
                        setFieldValue(
                          "number",
                          e.target.value.replace(/[^0-9]+/g, "")
                        );
                      }}
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
      )}
    </>
  );
}
