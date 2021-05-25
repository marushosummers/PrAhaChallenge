const getOperator = (args) => {
  if (!isOperator(args[0]))
     throw "Invalid operator";
  return args[0];
};

const isOperator = (arg) => {
	return (
		arg === "add" ||
		arg === "subtract" ||
		arg === "multiply" ||
		arg === "divide"
	);
};

module.exports = getOperator;
