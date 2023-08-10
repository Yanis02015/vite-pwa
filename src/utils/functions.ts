export const isDev = () =>
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const formatEventFormToJson = (
  event: React.FormEvent<HTMLFormElement>
) => {
  const myJson: { [key: string]: string } = {};
  const formData = new FormData(event.currentTarget);
  formData.forEach((value, key) => (myJson[key] = value.toString()));
  return myJson;
};
