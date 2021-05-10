const getOperator = require("./get-operator");

describe("演算子のチェック", () => {
  test("演算子がadd", () => {
    expect(getOperator(["add"])).toEqual("add");
  });
  test("演算子がsubtract", () => {
    expect(getOperator(["subtract"])).toEqual("subtract");
  });
  test("演算子がmultiply", () => {
    expect(getOperator(["multiply"])).toEqual("multiply");
  });
  test("演算子がdivide", () => {
    expect(getOperator(["divide"])).toEqual("divide");
  });
  test("演算子が想定外の文字列", () => {
    expect(() => {getOperator(["hoge"])}).toThrowError();
  });
  test("引数が存在しない", () => {
    expect(() => {getOperator([])}).toThrowError();
  });
});
