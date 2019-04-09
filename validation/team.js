const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateTeamInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.country)) {
    errors.country = "Kraj drużyny jest wymagany";
  }

  if (Validator.isEmpty(data.info)) {
    errors.info = "Informacja o drużynie jest wymagana";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
