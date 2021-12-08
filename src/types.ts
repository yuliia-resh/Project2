export type StateType = {
  appointments: AppointmentType[];
  errorMessage: null | string;
  authToken: undefined | string;
  departments: string[];
  isLoading: boolean;
  statuses: string[];
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
