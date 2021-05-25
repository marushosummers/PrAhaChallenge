const divide = require("./divide");

describe("割り算", () => {
	test("1/3=0.33となる(小数点以下3桁目を四捨五入)", () => {
		expect(divide([1, 3])).toEqual(0.33);
	});
	test("0で割るとエラーが出る", () => {
		expect(() => {divide([1, 0])}).toThrowError();
	});
});
