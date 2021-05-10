const getNumbers = require("./get-numbers");

describe("引数のチェック", () => {
	test("引数の文字列を数値に変換", () => {
		expect(getNumbers(["1"])).toEqual([1]);
	});
	test("引数が数字以外だとエラー", () => {
		expect(() => {
			getNumbers(["a"]);
		}).toThrowError();
	});
	test("引数の数が30以下は動作", () => {
		expect(getNumbers(Array(30).fill("1"))).toEqual(Array(30).fill(1));
	});
  test("引数の数が31以上だった場合にエラー", () => {
    expect(() => {
			getNumbers(Array(31).fill("1"));
		}).toThrowError();
	});
	test("引数が存在しない場合エラー", () => {
    expect(() => {
			getNumbers([]);
		}).toThrowError();
	});
});
