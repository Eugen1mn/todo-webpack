/** ****** ID VALIDATION ******* */
const idValidation = (id) => {
  if (typeof id !== 'number') {
    throw new Error('Should be id type number');
  }
};

export default idValidation;
