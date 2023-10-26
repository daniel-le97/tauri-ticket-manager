import consola from "consola";

const something = import.meta.env.PROD;

const logger = () => {
  if (something) {
    return;
  }
  return consola;
};
export default logger