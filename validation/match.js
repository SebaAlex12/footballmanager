const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateMatchInput(data) {
  let errors = {};

  if (Validator.isEmpty(data.firstTeamName)) {
    errors.firstTeamName = "Wybierz pierwszą drużynę";
  }

  if (Validator.isEmpty(data.secondTeamName)) {
    errors.secondTeamName = "Wybierz drugą drużynę";
  }

  if (Validator.isEmpty(data.date)) {
    errors.date = "Wybierz datę";
  }

  if (Validator.isEmpty(data.time)) {
    errors.time = "Wybierz godzinę";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
