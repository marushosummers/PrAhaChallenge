module.exports = (args) => {
  if (!isOperator(args[0]))
     throw "Invalid operator";
  return args[0];
};

let isOperator = (arg) => {
  return (
    arg === "add" ||
    arg === "subtract" ||
    arg === "multiply" ||
    arg === "divide"
  );
};