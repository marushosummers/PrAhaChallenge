const multiply = require("./multiply");

describe("掛け算", () => {
	test("1*2=2となる", () => {
		expect(multiply([1, 2])).toEqual(2);
	});
	test("計算結果が1000を越える場合は「big big number」と文字列が返る", () => {
		expect(multiply([1000, 2])).toEqual("big big number");
	});
});
