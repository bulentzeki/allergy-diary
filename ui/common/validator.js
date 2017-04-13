import XRegExp from "xregexp";

const validator = {
  name: (name) => {
    const rgx = XRegExp("[^\\pL\\.\\'\\s]");
    if (name && rgx.test(name.trim())) {
      return true;
    }
    return false;
  },
  email: (email) => {
    const rgx = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    if (email && (!rgx.test(email.trim())) && email.trim() !== "") {
      return true;
    }
    return false;
  },
  numerical: (input) => isNaN(Number(input)),
  alphaNumerical: (input) => {
    const rgx = /^[a-z0-9]+$/i;
    if (input && (!rgx.test(input.trim())) && input.trim() !== "") {
      return true;
    }
    return false;
  },
  password: (input) => {
    const rgx = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[●!"#$%&'()*+,\-.:;<=>?@^_`{|}~])(?=\S+$).{8,20}$/;
    if (input && rgx.test(input)) {
      return true;
    }
    return false;
  }
};

export default validator;
