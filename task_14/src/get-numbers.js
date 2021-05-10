const getNumbers = (args) => {
  if (!args.length || args.length > 30)
		throw "Invalid Number of arguments";

  const nums = args.map(Number);

  if (nums.some(isNaN))
    throw "Not a Number exists in arguments";

    return nums;
};

module.exports = getNumbers;
