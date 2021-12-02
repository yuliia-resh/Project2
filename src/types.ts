export type StateType = {
  isAuth: boolean;
  appointments: AppointmentType[];
  currentAppointment: AppointmentType;
  errorMessage: null | string;
  isLoading: boolean;
  currentUser: [];
};

export type AppointmentType = {
  id: number;
  firstName: string;
  secondName: string;
  date: number | string;
  department: string;
  status: string;
  notes: string;
  number: string;
};
