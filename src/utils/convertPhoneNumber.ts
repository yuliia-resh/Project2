export const convertPhoneNumber = (phoneNumber: string) => {
  const replacer = (_: string, p1: string, p2: string, p3: string) => {
    return `(${p1})-${p2}-${p3}`;
  };

  const convertedNumber = phoneNumber.replace(
    /^(\d{3})(\d{3})(\d{4})$/,
    replacer
  );
  return convertedNumber;
};
