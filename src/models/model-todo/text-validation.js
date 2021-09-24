/** ****** TEXT VALIDATION ******* */
const textValidation = (text) => {
  if (typeof text !== 'string') {
    throw new Error('The name of task must be string type');
  }
  if (text.trim() === '') {
    throw new Error('Fill in the input field');
  }
  return true;
};

export default textValidation;
