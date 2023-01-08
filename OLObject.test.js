//require("../WebHuTime/release/HuTime.js");
require("./debugHuTime.js");
require("./testCommon.js");

// ****** HuTime.OnLayerObjectBase ******
describe("HuTime.OnLayerObjectBase", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        null, 0, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40, 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Square();
            expect(obj).toBeInstanceOf(HuTime.OnLayerObjectBase);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(obj.rotate).toBe(initConstructorValue[3]);
        });
        test("typical", () => {
            let obj = new HuTime.Square(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj).toBeInstanceOf(HuTime.OnLayerObjectBase);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.rotate).toBe(acceptableConstructorValue[3]);
        });
        test.each (invalidValues().except(null).except(undefined).addNumbers())
        ("Invalid Types of style (%o)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Square(
                value, acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj.style).toBe(null);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[0].className).toBe("OnLayerObjectBase");
            expect(HuTime.ErrorInfos.log[0].method).toBe("OnLayerObjectBase");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("OnLayerObjectBase");
            expect(HuTime.ErrorInfos.log[1].method).toBe("style");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("");
        });
    });

    // **** プロパティ ****
    describe("id", () => {
        const initialValue = "";
        const acceptableValue = 100;

        // 不正な型の入力値
        test.each (invalidValues().exceptStrings())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "id",
                initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "id", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000], [-12.3, -12.3], [-1000, -1000],
            ["0", "0"], ["12.3", "12.3"], ["1000", "1000"], ["-12.3", "-12.3"], ["-1000", "-1000"],
            ["a", "a"], [" a", "a"], ["a ", "a"], [" a ", "a"],
            ["a b", "a b"], [" a b c ", "a b c"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "id",
                acceptableValue, value, expected));
    });
    describe("name", () => {
        const initialValue = "";
        const acceptableValue = "abc";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "name",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "name", "", value, "t001"));

        // 正当な入力値
        test.each ([
            ["a", "a"], [" a", "a"], ["a ", "a"], [" a ", "a"],
            ["a b", "a b"], [" a b c ", "a b c"],
            ["0", "0"], ["12.3", "12.3"], ["1000", "1000"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "name",
                acceptableValue, value, expected));
    });
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Square, "style",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(new HuTime.OnLayerObjectBase(),
                "style", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Square, "style",
                acceptableValue, value, expected));
    });
    describe("position", () => {
        const initialValue = null;
        const acceptableValue = new HuTime.TVPosition(30, 50);

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Square, "position",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers())
        ("Error-t001 (%o)", (value) => {
            let testObj = new HuTime.OnLayerObjectBase();
            testObj.position = new HuTime.XYPosition(0, 0);
            HuTime.ErrorInfos.clearLog();
            testObj.position = value;
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("OnLayerObjectBase");
            expect(HuTime.ErrorInfos.log[0].method).toBe("position");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("");
        });
        test.each (invalidValues().addNumbers())
        ("Error-d051 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(),
                "position", "", value, "d051"));

        // 正当な入力値
        test.each ([
            [new HuTime.XYPosition(300, -200), new HuTime.XYPosition(300, -200)],
            [new HuTime.TVPosition(300, -200), new HuTime.TVPosition(300, -200)]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Square, "position",
                acceptableValue, value, expected));
    });
    describe("rotate", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "rotate",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "rotate", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000], [-12.3, -12.3], [-1000, -1000],
            ["0", 0], ["12.3", 12.3], ["1000", 1000], ["-12.3", -12.3], ["-1000", -1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "rotate",
                acceptableValue, value, expected));
    });
    describe("visible", () => {
        const initialValue = true;
        const acceptableValue = false;

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().except(true).except(false))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "visible",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().except(true).except(false))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "visible", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [true, true], [false, false]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "visible",
                acceptableValue, value, expected));
    });
    describe("zIndex", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "zIndex",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "zIndex", "", value, "t001"));
        test.each ([-1])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "zIndex", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000], ["0", 0], ["12.3", 12.3], ["1000", 1000],
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "zIndex",
                acceptableValue, value, expected));
    });
    describe("processBeforeRedraw", () => {
        const initialValue = null;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptFunctions().except(null))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "processBeforeRedraw",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptFunctions().except(null))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "processBeforeRedraw", "", value, "t001"));

        // 正当な入力値
        test("Acceptable Strings (%o)", () => {
            let obj = new HuTime.Square();
            expect(obj.processBeforeRedraw).toBe(null);
            obj.processBeforeRedraw = () => { return "test"; };
            expect(obj.processBeforeRedraw).not.toBe(null);
            expect(obj.processBeforeRedraw.call(null)).toBe("test");
            obj.processBeforeRedraw = null;
            expect(obj.processBeforeRedraw).toBe(null);
        });
    });
    describe("processAfterRedraw", () => {
        const initialValue = null;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptFunctions().except(null))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "processAfterRedraw",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptFunctions().except(null))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.OnLayerObjectBase(null, new HuTime.XYPosition(0, 0)),
                "processAfterRedraw", "", value, "t001"));

        // 正当な入力値
        test("Acceptable Strings (%o)", () => {
            let obj = new HuTime.Square();
            expect(obj.processAfterRedraw).toBe(null);
            obj.processAfterRedraw = () => { return "test"; };
            expect(obj.processAfterRedraw).not.toBe(null);
            expect(obj.processAfterRedraw.call(null)).toBe("test");
            obj.processAfterRedraw = null;
            expect(obj.processAfterRedraw).toBe(null);
        });
    });

    // **** メソッド ****
    describe("redraw", () => {
        test("redraw", () => {
            let obj = new HuTime.Square();
            obj.position = new HuTime.XYPosition(0, 0);
            let beforeObj = null;
            let afterObj = null;
            let mockProcessBeforeRedraw = jest.fn().mockImplementation(
                (redrawnObj) => { beforeObj = redrawnObj; });
            let mockProcessAfterRedraw = jest.fn().mockImplementation(
                (redrawnObj) => { afterObj = redrawnObj; });
            let mockRedrawObject = jest.fn().mockImplementation(() => {});
            obj.processBeforeRedraw = mockProcessBeforeRedraw;
            obj.processAfterRedraw = mockProcessAfterRedraw;
            obj._redrawObject = mockRedrawObject;

            obj.redraw();
            expect(mockRedrawObject.mock.calls.length).toBe(1);
            expect(mockProcessBeforeRedraw.mock.calls.length).toBe(1);
            expect(mockProcessAfterRedraw.mock.calls.length).toBe(1);
            expect(beforeObj).toStrictEqual(obj);
            expect(afterObj).toStrictEqual(obj);

            // visible=falseでのテスト
            obj.visible = false;
            mockProcessBeforeRedraw.mockClear();
            mockProcessAfterRedraw.mockClear();
            mockRedrawObject.mockClear();
            obj.redraw();
            expect(mockRedrawObject.mock.calls.length).toBe(0);
            expect(mockProcessBeforeRedraw.mock.calls.length).toBe(0);
            expect(mockProcessAfterRedraw.mock.calls.length).toBe(0);
        });
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Square();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Square();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test("toJson",() => {
            let obj = new HuTime.Square();
            obj.id = "234";     // 数値文字列
            obj.name = "123";   // 数値文字列
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);

            obj = new HuTime.Square();
            obj.id = 234;       // 数値
            obj.name = "abc";   // 文字列
            json = obj.toJSON();
            dupObj = HuTime.JSON.parse(json);

            expect(dupObj).toStrictEqual(obj);
            obj = new HuTime.Square();
            obj.id = "abc";     // 文字列
            obj.name = "abc";   // 文字列
            json = obj.toJSON();
            dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});

// ****** OnLayerObjects ******
describe("HuTime.Line", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        new HuTime.PositionArray(),  0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)], 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, positions, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Line();
            expect(obj).toBeInstanceOf(HuTime.Line);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.positions).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.rotate).toBe(initConstructorValue[2]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Line(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            expect(obj).toBeInstanceOf(HuTime.Line);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.positions).toStrictEqual(
                HuTime.PositionArray.toPositionArray(acceptableConstructorValue[1]));
            expect(obj.rotate).toBe(acceptableConstructorValue[2]);
        });
        test.each([
            [[], new HuTime.PositionArray()],
            [[undefined], new HuTime.PositionArray()],
            [[undefined, undefined], new HuTime.PositionArray()],
            [[new HuTime.TVPosition(40, 100)],
                HuTime.PositionArray.toPositionArray([new HuTime.TVPosition(40, 100)])],
            [[new HuTime.TVPosition(40, 100), new HuTime.TVPosition(140, 200)],
                HuTime.PositionArray.toPositionArray(
                    [new HuTime.TVPosition(40, 100), new HuTime.TVPosition(140, 200)])],
            [[new HuTime.TVPosition(140, 200), undefined, undefined], new HuTime.PositionArray()],
            [[undefined, new HuTime.TVPosition(240, 300), undefined], new HuTime.PositionArray()]
        ])
        ("positions %#", (positions, expected) => {
            let obj = new HuTime.Line(undefined, positions, 0);
            expect(obj).toBeInstanceOf(HuTime.Line);
            expect(obj.positions).toStrictEqual(expected);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Line, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Line, "style",
                acceptableValue, value, expected));
    });
    describe("positions", () => {
        const initialValue = new HuTime.PositionArray();
        const acceptableValue =
            HuTime.PositionArray.toPositionArray(
                [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)]);

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptArrays()
            .add([undefined])
            .add([undefined, new HuTime.TVPosition(0, 0)])
            .add([new HuTime.TVPosition(0, 0), undefined]))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Line, "positions",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptArrays())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Line(null, acceptableValue),
                "positions", "", value, "t001"));
        test.each ([[[undefined]],
            [[undefined, new HuTime.TVPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), undefined]]
        ])
        ("Error-r002 (%#)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let testObj = new HuTime.Line(null, acceptableValue);
            testObj.positions = value;
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Line");
            expect(HuTime.ErrorInfos.log[0].method).toBe("positions");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("");
            expect(HuTime.ErrorInfos.log[1].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Line");
            expect(HuTime.ErrorInfos.log[1].method).toBe("positions");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("");
            expect(HuTime.ErrorInfos.log[2].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[2].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[2].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[2].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers().exceptArrays()
            .add([undefined])
            .add([undefined, new HuTime.TVPosition(0, 0)])
            .add([new HuTime.TVPosition(0, 0), undefined]))
        ("Error-d051 (%#)", (value) =>
            testErrorInfo(
                new HuTime.Line(null, null),
                "positions", "", value, "d051"));

        // 正当な入力値
        test.each ([
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)],
                HuTime.PositionArray.toPositionArray(
                    [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)])],
            [[new HuTime.TVPosition(0, 0), undefined, new HuTime.TVPosition(40, 40)],
                new HuTime.PositionArray()],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40), undefined],
                new HuTime.PositionArray()]
        ])
        ("Acceptable Strings (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Line, "positions",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Line();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawLine = jest.spyOn(HuTime.Drawing, "drawLine");
            spyOnRedrawObject.mockClear();
            spyOnDrawLine.mockClear();
            obj.redraw();   // 位置指定が無いので描画されない
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawLine.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawLine.mockClear();
            obj.positions = [new HuTime.XYPosition(0, 0)];      // positionsを設定(1点のみ)
            obj.redraw();   // 位置指定が1点のみなので描画されない
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawLine.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawLine.mockClear();
            obj.positions =             // positionsを設定（2点）
                [new HuTime.XYPosition(0, 0), new HuTime.XYPosition(20, 20)];
            obj.redraw();   // 位置指定2点から描画
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawLine.mock.calls.length).toBe(1);
            expect(spyOnDrawLine.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Line(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawLine = jest.spyOn(HuTime.Drawing, "drawLine");
            spyOnRedrawObject.mockClear();
            spyOnDrawLine.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawLine.mock.calls.length).toBe(1);
            expect(spyOnDrawLine.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Line();
            obj.positions = [new HuTime.XYPosition(0, 0), new HuTime.XYPosition(40, 40)];
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Line(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Line();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Line();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, positions, rotate
            //["initial", undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)], 30],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.TVPosition(10, 20), new HuTime.TVPosition(10, 20)], "30"],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.XYPosition(0, 0), undefined], 30],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.XYPosition(10, 20)], "30"]
        ])
        ("%s", (label, style, positions, rotate) => {
            let obj = new HuTime.Line(style, positions, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Polygon", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        new HuTime.PositionArray(),  0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        [new HuTime.TVPosition(0, 0),
            new HuTime.TVPosition(40, 40), new HuTime.TVPosition(0, 40)], 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, positions, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Polygon();
            expect(obj).toBeInstanceOf(HuTime.Polygon);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.positions).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.rotate).toBe(initConstructorValue[2]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Polygon(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            expect(obj).toBeInstanceOf(HuTime.Polygon);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.positions).toStrictEqual(
                HuTime.PositionArray.toPositionArray(acceptableConstructorValue[1]));
            expect(obj.rotate).toBe(acceptableConstructorValue[2]);
        });
        test.each([
            [[], new HuTime.PositionArray()],
            [[undefined], new HuTime.PositionArray()],
            [[undefined, undefined], new HuTime.PositionArray()],
            [[new HuTime.TVPosition(40, 100)],
                HuTime.PositionArray.toPositionArray([new HuTime.TVPosition(40, 100)])],
            [[new HuTime.TVPosition(140, 200), undefined, undefined], new HuTime.PositionArray()],
            [[undefined, new HuTime.TVPosition(240, 300), undefined], new HuTime.PositionArray()]
        ])
        ("positions", (positions, expected) => {
            let obj = new HuTime.Polygon(undefined, positions, 0);
            expect(obj).toBeInstanceOf(HuTime.Polygon);
            expect(obj.positions).toStrictEqual(expected);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Polygon, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Polygon, "style",
                acceptableValue, value, expected));
    });
    describe("positions", () => {
        const initialValue = new HuTime.PositionArray();
        const acceptableValue =
            HuTime.PositionArray.toPositionArray([new HuTime.TVPosition(0, 0),
                new HuTime.TVPosition(40, 40), new HuTime.TVPosition(0, 40)]);

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptArrays()
            .add([undefined])
            .add([undefined, new HuTime.TVPosition(0, 0)])
            .add([new HuTime.TVPosition(0, 0), undefined]))
        ("Invalid Types (%#)", (value) =>
            testPropertyRejectedObject(HuTime.Polygon, "positions",
                initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptArrays())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Polygon(null, acceptableValue),
                "positions", "", value, "t001"));
        test.each ([[[undefined]],
            [[undefined, new HuTime.TVPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), undefined]]
        ])
        ("Error-r002 (%#)", (value) => {
            HuTime.ErrorInfos.clearLog();
            let testObj = new HuTime.Polygon(null, acceptableValue);
            testObj.positions = value;
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Polygon");
            expect(HuTime.ErrorInfos.log[0].method).toBe("positions");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("");
            expect(HuTime.ErrorInfos.log[1].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Polygon");
            expect(HuTime.ErrorInfos.log[1].method).toBe("positions");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("");
            expect(HuTime.ErrorInfos.log[2].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[2].className).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[2].method).toBe("PositionArray");
            expect(HuTime.ErrorInfos.log[2].parameter).toBe("items");
        });
        test.each (invalidValues().addNumbers().exceptArrays()
            .add([undefined])
            .add([undefined, new HuTime.TVPosition(0, 0)])
            .add([new HuTime.TVPosition(0, 0), undefined]))
        ("Error-d051 (%#)", (value) =>
            testErrorInfo(
                new HuTime.Polygon(null, null),
                "positions", "", value, "d051"));

        // 正当な入力値
        test.each ([
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)],
                HuTime.PositionArray.toPositionArray(
                    [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40)])],
            [[new HuTime.TVPosition(0, 0), undefined, new HuTime.TVPosition(40, 40)],
                new HuTime.PositionArray()],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40), undefined],
                new HuTime.PositionArray()]
        ])
        ("Acceptable Strings (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Polygon, "positions",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Polygon();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawPolygon = jest.spyOn(HuTime.Drawing, "drawPolygon");
            spyOnRedrawObject.mockClear();
            spyOnDrawPolygon.mockClear();
            obj.redraw();   // 位置指定が無いので実際には描画されない
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawPolygon.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawPolygon.mockClear();
            obj.positions = [new HuTime.XYPosition(0, 0)];      // positionsを設定(1点のみ)
            obj.redraw();   // 位置指定が1点のみなので実際には描画されない
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawPolygon.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawPolygon.mockClear();
            obj.positions =             // positionsを設定（2点）
                [new HuTime.XYPosition(0, 0), new HuTime.XYPosition(20, 20)];
            obj.redraw();   // 位置指定2点から描画
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawPolygon.mock.calls.length).toBe(1);
            expect(spyOnDrawPolygon.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Polygon(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawSquare = jest.spyOn(HuTime.Drawing, "drawPolygon");
            spyOnRedrawObject.mockClear();
            spyOnDrawSquare.mockClear();
            obj._redrawObject();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Polygon();
            obj.positions = [new HuTime.XYPosition(0, 0),
                new HuTime.XYPosition(40, 40), new HuTime.XYPosition(0, 40)];
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Polygon(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Polygon();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Polygon();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, positions, rotate
            ["initial", undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)], 30],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.TVPosition(10, 20), new HuTime.TVPosition(10, 20)], "30"],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.XYPosition(0, 0), undefined], 30],
            ["typical", new HuTime.FigureStyle("red"),
                [new HuTime.XYPosition(10, 20)], "30"]
        ])
        ("%s", (label, style, positions, rotate) => {
            let obj = new HuTime.Polygon(style, positions, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Square", () => {
    const initConstructorValue = [new HuTime.FigureStyle(), null, 0, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40, 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Square();
            expect(obj).toBeInstanceOf(HuTime.Square);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.width).toBe(initConstructorValue[2]);
            expect(obj.rotate).toBe(initConstructorValue[3]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Square(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj).toBeInstanceOf(HuTime.Square);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.width).toBe(acceptableConstructorValue[2]);
            expect(obj.rotate).toBe(acceptableConstructorValue[3]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Square, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Square, "style",
                acceptableValue, value, expected));
    });
    describe("width", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(1001))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Square, "width",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Square(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "t001"));
        test.each ([-1, 1001])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Square(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Square, "width",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Square();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawSquare = jest.spyOn(HuTime.Drawing, "drawSquare");
            spyOnRedrawObject.mockClear();
            spyOnDrawSquare.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawSquare.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawSquare.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Square(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawSquare = jest.spyOn(HuTime.Drawing, "drawSquare");
            spyOnRedrawObject.mockClear();
            spyOnDrawSquare.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.calls.length).toBe(1);
            expect(spyOnDrawSquare.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Square();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Square(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Square();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Square();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, width, rotate
            ["initial", undefined,
                undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40, 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(10, 20), 40, "30"],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40", 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(10, 20), "40", "30"]
        ])
        ("%s", (label, style, position, width, rotate) => {
            let obj = new HuTime.Square(style, position, width, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Rect", () => {
    const initConstructorValue = [new HuTime.FigureStyle(), null, null, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), new HuTime.TVPosition(40, 40), 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position1, position2, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Rect();
            expect(obj).toBeInstanceOf(HuTime.Rect);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position1).toStrictEqual(initConstructorValue[1]);
            expect(obj.position2).toStrictEqual(initConstructorValue[2]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[2].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[3].code).toBe("t001");
            expect(obj.rotate).toBe(initConstructorValue[3]);
            expect(HuTime.ErrorInfos.log.length).toBe(4);
        });
        test("typical", () => {
            let obj = new HuTime.Rect(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj).toBeInstanceOf(HuTime.Rect);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position1).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.position2).toStrictEqual(acceptableConstructorValue[2]);
            expect(obj.rotate).toBe(acceptableConstructorValue[3]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Rect, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Rect, "style",
                acceptableValue, value, expected));
    });
    describe("position1", () => {
        const initialValue = null;
        const acceptableValue = new HuTime.TVPosition(40, 40);

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Rect, "position1",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(new HuTime.Rect(null,
                new HuTime.XYPosition(0, 0), new HuTime.XYPosition(10, 10)),
                "position1", "", value, "t001"));
        test.each (invalidValues())
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(new HuTime.Rect(null,
                null, new HuTime.XYPosition(10, 10)),
                "position1", "", value, "d051"));

        // 正当な入力値
        test.each ([
            [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)],
            [new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0)]
        ])
        ("Acceptable Strings (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Rect, "position1",
                acceptableValue, value, expected));
    });
    describe("position2", () => {
        const initialValue = null;
        const acceptableValue = new HuTime.TVPosition(40, 40);

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Rect, "position2",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(new HuTime.Rect(null,
                new HuTime.XYPosition(0, 0), new HuTime.XYPosition(10, 10)),
                "position2", "", value, "t001"));
        test.each (invalidValues())
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(new HuTime.Rect(null,
                null, new HuTime.XYPosition(10, 10)),
                "position2", "", value, "d051"));

        // 正当な入力値
        test.each ([
            [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)],
            [new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0)]
        ])
        ("Acceptable Strings (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Rect, "position2",
                acceptableValue, value, expected));
    });
    describe("position", () => {
        const initialValue = null;
        const acceptableValue = new HuTime.TVPosition(40, 40);

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Rect, "position",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)],
            [new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0)]
        ])
        ("Acceptable Strings (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Rect, "position",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Rect();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawRect = jest.spyOn(HuTime.Drawing, "drawRect");
            spyOnRedrawObject.mockClear();
            spyOnDrawRect.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawRect.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawRect.mockClear();
            obj.position1 = new HuTime.XYPosition(0, 0);    // position1を設定
            obj.position2 = new HuTime.XYPosition(10, 10);  // position2を設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawRect.mock.calls.length).toBe(1);
            expect(spyOnDrawRect.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Rect(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawRect = jest.spyOn(HuTime.Drawing, "drawRect");
            spyOnRedrawObject.mockClear();
            spyOnDrawRect.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawRect.mock.calls.length).toBe(1);
            expect(spyOnDrawRect.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Rect();
            obj.layer = new HuTime.DummyLayer();
            obj.position1 = new HuTime.XYPosition(0, 0);
            obj.position2 = new HuTime.XYPosition(10, 10);
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Rect(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Rect();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Rect();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, position2, rotate
            ["initial", undefined,
                undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40, 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(10, 20), 40, "30"],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40", 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(10, 20), "40", "30"]
        ])
        ("%s", (label, style, position, position2, rotate) => {
            let obj = new HuTime.Rect(style, position, position2, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Circle", () => {
    const initConstructorValue = [new HuTime.FigureStyle(), null, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Circle();
            expect(obj).toBeInstanceOf(HuTime.Circle);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.width).toBe(initConstructorValue[2]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Circle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            expect(obj).toBeInstanceOf(HuTime.Circle);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.width).toBe(acceptableConstructorValue[2]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Circle, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Circle, "style",
                acceptableValue, value, expected));
    });
    describe("width", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(1001))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Circle, "width",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Circle(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "t001"));
        test.each ([-1, 1001])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Circle(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Circle, "width",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Circle();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawCircle = jest.spyOn(HuTime.Drawing, "drawCircle");
            spyOnRedrawObject.mockClear();
            spyOnDrawCircle.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawCircle.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawCircle.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawCircle.mock.calls.length).toBe(1);
            expect(spyOnDrawCircle.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Circle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawCircle = jest.spyOn(HuTime.Drawing, "drawCircle");
            spyOnRedrawObject.mockClear();
            spyOnDrawCircle.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawCircle.mock.calls.length).toBe(1);
            expect(spyOnDrawCircle.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Circle();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Circle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Circle();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Circle();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, width
            ["initial", undefined,
                undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40"]
        ])
        ("%s", (label, style, position, width) => {
            let obj = new HuTime.Circle(style, position, width);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Arc", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        null, 0, 0, 0, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40, 60, 120, 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Arc();
            expect(obj).toBeInstanceOf(HuTime.Arc);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.radius).toBe(initConstructorValue[2]);
            expect(obj.startAngle).toBe(initConstructorValue[3]);
            expect(obj.endAngle).toBe(initConstructorValue[4]);
            expect(obj.rotate).toBe(initConstructorValue[5]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Arc(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            expect(obj).toBeInstanceOf(HuTime.Arc);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.radius).toBe(acceptableConstructorValue[2]);
            expect(obj.startAngle).toBe(acceptableConstructorValue[3]);
            expect(obj.endAngle).toBe(acceptableConstructorValue[4]);
            expect(obj.rotate).toBe(acceptableConstructorValue[5]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Arc, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Arc, "style",
                acceptableValue, value, expected));
    });
    describe("radius", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(501))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Arc, "radius",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Arc(null, new HuTime.XYPosition(0, 0), 10),
                "radius", "", value, "t001"));
        test.each ([-1, 501])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Arc(null, new HuTime.XYPosition(0, 0), 10),
                "radius", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [500, 500]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Arc, "radius",
                acceptableValue, value, expected));
    });
    describe("startAngle", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Arc, "startAngle",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Arc(null, new HuTime.XYPosition(0, 0), 10),
                "startAngle", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [500, 500], [1.23, 1.23], [-30, -30],
            ["0", 0], ["500", 500], ["1.23", 1.23], ["-30", -30]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Arc, "startAngle",
                acceptableValue, value, expected));
    });
    describe("endAngle", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Arc, "endAngle",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Arc(null, new HuTime.XYPosition(0, 0), 10),
                "endAngle", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [500, 500], [1.23, 1.23], [-30, -30],
            ["0", 0], ["500", 500], ["1.23", 1.23], ["-30", -30]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Arc, "endAngle",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Arc();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawArc = jest.spyOn(HuTime.Drawing, "drawArc");
            spyOnRedrawObject.mockClear();
            spyOnDrawArc.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawArc.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawArc.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawArc.mock.calls.length).toBe(1);
            expect(spyOnDrawArc.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Arc(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawArc = jest.spyOn(HuTime.Drawing, "drawArc");
            spyOnRedrawObject.mockClear();
            spyOnDrawArc.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawArc.mock.calls.length).toBe(1);
            expect(spyOnDrawArc.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Arc();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Arc(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Arc();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Arc();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, radius, startAngle, endAngle, rotate
            ["initial", undefined,
                undefined, undefined, undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40, 60, 120, 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(10, 20), 40, 60, 120, "30"],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40", "60", "120", 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(10, 20), "40", "60", "120", "30"]
        ])
        ("%s", (label, style, position, radius, startAngle, endAngle, rotate) => {
            let obj = new HuTime.Arc(style, position, radius, startAngle, endAngle, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Pie", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        null, 0, 0, 0, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40, 60, 120, 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Pie();
            expect(obj).toBeInstanceOf(HuTime.Pie);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.radius).toBe(initConstructorValue[2]);
            expect(obj.startAngle).toBe(initConstructorValue[3]);
            expect(obj.endAngle).toBe(initConstructorValue[4]);
            expect(obj.rotate).toBe(initConstructorValue[5]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Pie(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            expect(obj).toBeInstanceOf(HuTime.Pie);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.radius).toBe(acceptableConstructorValue[2]);
            expect(obj.startAngle).toBe(acceptableConstructorValue[3]);
            expect(obj.endAngle).toBe(acceptableConstructorValue[4]);
            expect(obj.rotate).toBe(acceptableConstructorValue[5]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Pie, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Pie, "style",
                acceptableValue, value, expected));
    });
    describe("radius", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(501))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Pie, "radius",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Pie(null, new HuTime.XYPosition(0, 0), 10),
                "radius", "", value, "t001"));
        test.each ([-1, 501])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Pie(null, new HuTime.XYPosition(0, 0), 10),
                "radius", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [500, 500]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Pie, "radius",
                acceptableValue, value, expected));
    });
    describe("startAngle", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Pie, "startAngle",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Pie(null, new HuTime.XYPosition(0, 0), 10),
                "startAngle", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [500, 500], [1.23, 1.23], [-30, -30],
            ["0", 0], ["500", 500], ["1.23", 1.23], ["-30", -30]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Pie, "startAngle",
                acceptableValue, value, expected));
    });
    describe("endAngle", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Pie, "endAngle",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Pie(null, new HuTime.XYPosition(0, 0), 10),
                "endAngle", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [0, 0], [500, 500], [1.23, 1.23], [-30, -30],
            ["0", 0], ["500", 500], ["1.23", 1.23], ["-30", -30]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Pie, "endAngle",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Pie();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawPie = jest.spyOn(HuTime.Drawing, "drawPie");
            spyOnRedrawObject.mockClear();
            spyOnDrawPie.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawPie.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawPie.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawPie.mock.calls.length).toBe(1);
            expect(spyOnDrawPie.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Pie(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawPie = jest.spyOn(HuTime.Drawing, "drawPie");
            spyOnRedrawObject.mockClear();
            spyOnDrawPie.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawPie.mock.calls.length).toBe(1);
            expect(spyOnDrawPie.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Pie();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Pie(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Pie();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Arc();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, radius, startAngle, endAngle, rotate
            ["initial", undefined,
                undefined, undefined, undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40, 60, 120, 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(10, 20), 40, 60, 120, "30"],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40", "60", "120", 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(10, 20), "40", "60", "120", "30"]
        ])
        ("%s", (label, style, position, radius, startAngle, endAngle, rotate) => {
            let obj = new HuTime.Pie(style, position, radius, startAngle, endAngle, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Triangle", () => {
    const initConstructorValue = [new HuTime.FigureStyle(), null, 0, 0];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0), 40, 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, width, rotate
        test("initial", () => {
            HuTime.ErrorInfos.clearLog();
            let obj = new HuTime.Triangle();
            expect(obj).toBeInstanceOf(HuTime.Triangle);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(HuTime.ErrorInfos.log[0].code).toBe("d051");
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(obj.width).toBe(initConstructorValue[2]);
            expect(obj.rotate).toBe(initConstructorValue[3]);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
        test("typical", () => {
            let obj = new HuTime.Triangle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj).toBeInstanceOf(HuTime.Triangle);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.width).toBe(acceptableConstructorValue[2]);
            expect(obj.rotate).toBe(acceptableConstructorValue[3]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Triangle, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Triangle, "style",
                acceptableValue, value, expected));
    });
    describe("width", () => {
        const initialValue = 0;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(1001))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Triangle, "width",
                initialValue, acceptableValue, value));
        test.each (invalidValues())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Triangle(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "t001"));
        test.each ([-1, 1001])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Triangle(null, new HuTime.XYPosition(0, 0), 10),
                "width", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [0, 0], [12.3, 12.3], [1000, 1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Triangle, "width",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.Triangle();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawTriangle = jest.spyOn(HuTime.Drawing, "drawTriangle");
            spyOnRedrawObject.mockClear();
            spyOnDrawTriangle.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawTriangle.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawTriangle.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawTriangle.mock.calls.length).toBe(1);
            expect(spyOnDrawTriangle.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.Triangle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawTriangle = jest.spyOn(HuTime.Drawing, "drawTriangle");
            spyOnRedrawObject.mockClear();
            spyOnDrawTriangle.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawTriangle.mock.calls.length).toBe(1);
            expect(spyOnDrawTriangle.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Triangle();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.Triangle(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Triangle();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Triangle();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, width, rotate
            ["initial", undefined,
                undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0), 40, 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(10, 20), 40, "30"],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(0, 0), "40", 30],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.XYPosition(10, 20), "40", "30"]
        ])
        ("%s", (label, style, position, width, rotate) => {
            let obj = new HuTime.Triangle(style, position, width, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.Image", () => {
    const initConstructorValue = [new HuTime.FigureStyle(),
        null, "", null, null, 0, false, () => {}, () => {}];
    const acceptableConstructorValue = [new HuTime.FigureStyle("red"),
        new HuTime.TVPosition(0, 0),
        "http://localhost/test/html/testImage.png", 50, 25, 0, true,
        () => { return true; }, ()=> { return false; }];
    let sampleImage;
    beforeAll(() => {
        global.Image = MockImage;
        sampleImage = new window.Image();
        sampleImage.src = "test/html/testImage.png";
    });

    // **** コンストラクタ ****
    describe("constructor", () => {
        test("initial", () => {
            let obj = new HuTime.Image();
            expect(obj).toBeInstanceOf(HuTime.Image);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(obj.src).toBe(initConstructorValue[2]);
            expect(obj.width).toBe(initConstructorValue[3]);
            expect(obj.height).toBe(initConstructorValue[4]);
            expect(obj.rotate).toBe(initConstructorValue[5]);
            expect(obj.drawAlternate).toBe(initConstructorValue[6]);
            expect(obj.onload.call(null)).toBe(initConstructorValue[7]());
            expect(obj.onerror.call(null)).toBe(initConstructorValue[8]());
        });
        test("typical", () => {
            let obj = new HuTime.Image(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5],
                acceptableConstructorValue[6], acceptableConstructorValue[7],
                acceptableConstructorValue[8]);
            expect(obj).toBeInstanceOf(HuTime.Image);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.src).toBe(acceptableConstructorValue[2]);
            expect(obj.width).toBe(acceptableConstructorValue[3]);
            expect(obj.height).toBe(acceptableConstructorValue[4]);
            expect(obj.rotate).toBe(acceptableConstructorValue[5]);
            expect(obj.drawAlternate).toBe(acceptableConstructorValue[6]);
            expect(obj.onload.call(null)).toBe(acceptableConstructorValue[7]());
            expect(obj.onerror.call(null)).toBe(acceptableConstructorValue[8]());
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.FigureStyle();
        const acceptableValue = new HuTime.FigureStyle("red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.Image, "style",
                initialValue, acceptableValue, value));

        // 正当な入力値
        test.each ([
            [new HuTime.FigureStyle(), new HuTime.FigureStyle()],
            [new HuTime.FigureStyle("red", "#fcf"), new HuTime.FigureStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.Image, "style",
                acceptableValue, value, expected));
    });
    describe("onload", () => {
        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions().addNumbers())
        ("Invalid Types (%o)", (value) => {
            let obj = new HuTime.Image();
            obj.onload = value;
            expect(typeof value).not.toBe("function");
            expect(typeof obj.onload).toBe("function");
        });
        test.each (invalidValues().exceptFunctions().addNumbers())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(),
                "onload", "", value, "t001"));

        // 正当な入力値
        test.each ([
            () => {}, (img) => { return img; }
        ])
        ("Acceptable Values (%#)", (value) => {
            let obj = new HuTime.Image();
            obj.onload = value;
            expect(typeof obj.onload).toBe("function");
            expect(obj.onload.call(null)).toBe(value());
        });

        // 動作確認
        test("Execution", async () => {
            let obj = new HuTime.Image(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5],
                acceptableConstructorValue[6]);
            let value = undefined;
            let callback = jest.fn().mockImplementation((img) => {
                value = img;
            });
            obj.onload = callback;
            await obj.reload();
            expect(callback).toHaveBeenCalled();
            expect(value).toStrictEqual(obj.img);
        });
    });
    describe("onerror", () => {
        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions().addNumbers())
        ("Invalid Types (%o)", (value) => {
            let obj = new HuTime.Image();
            obj.onerror = value;
            expect(typeof value).not.toBe("function");
            expect(typeof obj.onerror).toBe("function");
        });
        test.each (invalidValues().exceptFunctions().addNumbers())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(),
                "onerror", "", value, "t001"));

        // 正当な入力値
        test.each ([
            () => {}, (img) => { return img; }
        ])
        ("Acceptable Values (%#)", (value) => {
            let obj = new HuTime.Image();
            obj.onerror = value;
            expect(typeof obj.onerror).toBe("function");
            expect(obj.onerror.call(null)).toBe(value());
        });

        // 動作確認
        test("Execution", async () => {
            let obj = new HuTime.Image(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                "invalidURL", acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5],
                acceptableConstructorValue[6]);
            let value = undefined;
            let callback = jest.fn().mockImplementation((e) => {
                value = e;
            });
            obj.onerror = callback;
            await obj.reload().then(() => {}, () => {});
            expect(callback).toHaveBeenCalled();
            expect(value).toBeInstanceOf(Event);
            expect(value.type).toBe("error");
        });
    });
    describe("img", () => {
        test("value", async () => {
            let obj;
            await new Promise((resolve, reject) => {
                obj = new HuTime.Image(
                    acceptableConstructorValue[0], acceptableConstructorValue[1],
                    acceptableConstructorValue[2], acceptableConstructorValue[3],
                    acceptableConstructorValue[4], acceptableConstructorValue[5],
                    acceptableConstructorValue[6],
                    (img) => resolve(img), (e) => reject(e));
            }).then(() => {
                expect(obj.img).toBeInstanceOf(HTMLImageElement);
            });
            await new Promise((resolve, reject) => {
                obj = new HuTime.Image(
                    acceptableConstructorValue[0], acceptableConstructorValue[1],
                    "invalidURL", acceptableConstructorValue[3],
                    acceptableConstructorValue[4], acceptableConstructorValue[5],
                    acceptableConstructorValue[6],
                    (img) => resolve(img), (e) => reject(e));
            }).then(() => {}, () => {
                expect(obj.img).toBe(null);
            });
        })
    });
    describe("loaded", () => {
        test("value", async () => {
            let obj;
            await new Promise((resolve, reject) => {
                obj = new HuTime.Image(
                    acceptableConstructorValue[0], acceptableConstructorValue[1],
                    acceptableConstructorValue[2], acceptableConstructorValue[3],
                    acceptableConstructorValue[4], acceptableConstructorValue[5],
                    acceptableConstructorValue[6],
                    (img) => resolve(img), (e) => reject(e));
            }).then(() => {
                expect(obj.loaded).toBe(true);
            });
            await new Promise((resolve, reject) => {
                obj = new HuTime.Image(
                    acceptableConstructorValue[0], acceptableConstructorValue[1],
                    "invalidURL", acceptableConstructorValue[3],
                    acceptableConstructorValue[4], acceptableConstructorValue[5],
                    acceptableConstructorValue[6],
                    (img) => resolve(img), (e) => reject(e));
            }).then(() => {}, () => {
                expect(obj.loaded).toBe(false);
            });
        })
    });
    describe("src", () => {
        const initialValue = "";
        const acceptableValue = "http://localhost/test/html/testImage.png";

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Image, "src",
                initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "src", "", value, "t001"));
        test.each (["", " ", "  ", "\t", "\t\t",
            "\r\n", "\n", "\r", "\r\n\r\n", "\n\n", "\r\r"])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "src", "", value, "r002"));




        // 正当な入力値
        test.each ([
            ["http://localhost/test/html/testImage.png", "http://localhost/test/html/testImage.png"],
            ["test/html/testImage.png", "http://localhost/test/html/testImage.png"],
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Image, "src",
                acceptableValue, value, expected));
    });
    describe("width", () => {
        const initialValue = null;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Image, "width",
                initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).except(undefined))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "width", "", value, "t001"));
        test.each ([-1, 1001])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "width", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [null, null], [undefined, null], [0, 0], [12.3, 12.3], [1000, 1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Image, "width",
                acceptableValue, value, expected));
    });
    describe("height", () => {
        const initialValue = null;
        const acceptableValue = 40;

        // 不正な型の入力値
        test.each (invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Image, "height",
                initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).except(undefined))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "height", "", value, "t001"));
        test.each ([-1, 1001])
        ("Error-r001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "height", "", value, "r001"));

        // 正当な入力値
        test.each ([
            [null, null], [undefined, null], [0, 0], [12.3, 12.3], [1000, 1000]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.Image, "height",
                acceptableValue, value, expected));
    });
    describe("drawAlternate", () => {
        const initialValue = false;
        const acceptableValue = true;

        test.each (invalidValues().except(null).except(undefined)
            .except(false).except(true))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.Image, "drawAlternate",
                initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).except(undefined)
            .except(false).except(true))
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(
                new HuTime.Image(null, new HuTime.XYPosition(0, 0)),
                "drawAlternate", "", value, "t001"));
    });

    // **** メソッド ****
    describe("reload", () => {
        test("Execution", async () => {
            let callback = jest.fn().mockImplementation(() => {
            });
            let obj = new HuTime.Image(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5],
                acceptableConstructorValue[6], callback);
            obj.onload = callback;
            await obj.reload();
            await obj.reload();
            await obj.reload();
            expect(callback).toHaveBeenCalled();
            expect(callback.mock.calls.length).toBe(4); // コンストラクタの分も合わせて4回

            let onload = jest.fn().mockImplementation(() => { return true; });
            let onerror = jest.fn().mockImplementation(() => { return false; });
            obj.onload = onload;
            obj.onerror = onerror;
            await obj.reload().then(() => {
                expect(onload).toHaveBeenCalled();
                expect(onerror).not.toHaveBeenCalled();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f101");
            });
            obj.src = "invalidURL";
            onload.mockClear();
            onerror.mockClear();
            await obj.reload().then(() => {}, () => {
                expect(onload).not.toHaveBeenCalled();
                expect(onerror).toHaveBeenCalled();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f001");
            });
        });
    });
    describe("_redrawObject", () => {
        test("initial", async () => {
            let obj = new HuTime.Image();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawImage = jest.spyOn(HuTime.Drawing, "drawImage");
            spyOnRedrawObject.mockClear();
            spyOnDrawImage.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawImage.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawImage.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawImage.mock.calls.length).toBe(1);
            expect(await HuTime.Drawing.drawImage(obj.style, obj.layer, obj.position,
                obj.src, obj.width, obj.height, obj.rotate, obj.canvas)).toBe(false);
        })
        test("typical", async () => {
            let obj = new HuTime.Image(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3],
                acceptableConstructorValue[4], acceptableConstructorValue[5],
                acceptableConstructorValue[6]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawImage = jest.spyOn(HuTime.Drawing, "drawImage");
            spyOnRedrawObject.mockClear();
            spyOnDrawImage.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawImage.mock.calls.length).toBe(1);
            expect(await HuTime.Drawing.drawImage(obj.style, obj.layer, obj.position,
                obj.src, obj.width, obj.height, obj.rotate, obj.canvas)).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.Image();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBe(null);
        })
        test("typical", async () => {
            let obj;
            await new Promise((resolve, reject) => {
                obj = new HuTime.Image(
                    acceptableConstructorValue[0], acceptableConstructorValue[1],
                    acceptableConstructorValue[2], acceptableConstructorValue[3],
                    acceptableConstructorValue[4], acceptableConstructorValue[5],
                    acceptableConstructorValue[6],
                    (img) => resolve(img), (e) => reject(e));
            }).then(() => {
                obj.layer = new HuTime.DummyLayer();
                expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
            });
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Image();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.Image();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, src, width, height, rotate, drawAlternate
            ["initial", undefined, undefined,
                undefined, undefined, undefined, undefined, undefined],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0),
                "http://localhost/test/html/testImage.png", 50, 25, 30, true],
            ["typical", new HuTime.FigureStyle("red"),
                new HuTime.TVPosition(0, 0),
                "test/html/testImage.png", 50, 25, 30, true]
        ])
        ("%s", (label, style, position, src, width, height, rotate, drawAlternate) => {
            let obj = new HuTime.Image(
                style, position, src, width, height, rotate, drawAlternate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});
describe("HuTime.String", () => {
    const initConstructorValue = [new HuTime.StringStyle(), null, "", 0];
    const acceptableConstructorValue = [new HuTime.StringStyle("red", "30px"),
        new HuTime.TVPosition(0, 0), "abc", 30];

    // **** コンストラクタ ****
    describe("constructor", () => {
        // style, position, text, rotate
        test("initial", () => {
            let obj = new HuTime.String();
            expect(obj).toBeInstanceOf(HuTime.String);
            expect(obj.style).toStrictEqual(initConstructorValue[0]);
            expect(obj.position).toStrictEqual(initConstructorValue[1]);
            expect(obj.text).toBe(initConstructorValue[2]);
            expect(obj.rotate).toBe(initConstructorValue[3]);
        });
        test("typical", () => {
            let obj = new HuTime.String(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            expect(obj).toBeInstanceOf(HuTime.String);
            expect(obj.style).toStrictEqual(acceptableConstructorValue[0]);
            expect(obj.position).toStrictEqual(acceptableConstructorValue[1]);
            expect(obj.text).toBe(acceptableConstructorValue[2]);
            expect(obj.rotate).toBe(acceptableConstructorValue[3]);
        });
    });

    // **** プロパティ ****
    describe("style", () => {
        const initialValue = new HuTime.StringStyle();
        const acceptableValue = new HuTime.StringStyle("20px", "red");

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.String, "style",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(new HuTime.String(),
                "style", "", value, "t001"));

        // 正当な入力値
        test.each ([
            [new HuTime.StringStyle(), new HuTime.StringStyle()],
            [new HuTime.StringStyle("red", "#fcf"), new HuTime.StringStyle("red", "#fcf")]
        ])
        ("Acceptable Values (%#)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.String, "style",
                acceptableValue, value, expected));
    });
    describe("text", () => {
        const initialValue = "";
        const acceptableValue = "abc";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.String, "text",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Error-t001 (%o)", (value) =>
            testErrorInfo(new HuTime.String(),
                "text", "", value, "t001"));

        // 正当な入力値
        test.each ([
            ["", ""], ["abc", "abc"], ["123\n123", "123\n123"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.String, "text",
                acceptableValue, value, expected));
    });

    // **** メソッド ****
    describe("_redrawObject", () => {
        test("initial", () => {
            let obj = new HuTime.String();
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawString = jest.spyOn(HuTime.Drawing, "drawString");
            spyOnRedrawObject.mockClear();
            spyOnDrawString.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(0);
            expect(spyOnDrawString.mock.calls.length).toBe(0);

            spyOnRedrawObject.mockClear();
            spyOnDrawString.mockClear();
            obj.position = new HuTime.XYPosition(0, 0);     // positionを設定
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawString.mock.calls.length).toBe(1);
            expect(spyOnDrawString.mock.results[0].value).toBe(true);
        })
        test("typical", () => {
            let obj = new HuTime.String(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            let spyOnRedrawObject = jest.spyOn(obj, "_redrawObject");
            let spyOnDrawString = jest.spyOn(HuTime.Drawing, "drawString");
            spyOnRedrawObject.mockClear();
            spyOnDrawString.mockClear();
            obj.redraw();
            expect(spyOnRedrawObject.mock.calls.length).toBe(1);
            expect(spyOnDrawString.mock.calls.length).toBe(1);
            expect(spyOnDrawString.mock.results[0].value).toBe(true);
        })
    });
    describe("_getExtractionArea", () => {
        test("initial", () => {
            let obj = new HuTime.String();
            obj.position = new HuTime.XYPosition(0, 0);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
        test("typical", () => {
            let obj = new HuTime.String(
                acceptableConstructorValue[0], acceptableConstructorValue[1],
                acceptableConstructorValue[2], acceptableConstructorValue[3]);
            obj.layer = new HuTime.DummyLayer();
            expect(obj._getExtractionArea()).toBeInstanceOf(CanvasRenderingContext2D);
        })
    });

    // **** JSON出力 ****
    describe("_toJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.String();
            expect(obj._toJSONProperties).toBeDefined();
        })
    });
    describe("_parseJSONProperties", () => {
        test("general", () => {
            let obj = new HuTime.String();
            expect(obj._parseJSONProperties).toBeDefined();
        })
    });
    describe("toJSON", () => {
        test.each ([
            // label, style, position, text, rotate
            ["initial", undefined,
                undefined, undefined, undefined],
            ["typical", new HuTime.StringStyle("red", "30px"),
                new HuTime.TVPosition(0, 0), "abc", 30],
            ["typical", new HuTime.StringStyle("red", "30px"),
                new HuTime.TVPosition(10, 20), "abc", 30],
            ["typical", new HuTime.StringStyle("red", "30px"),
                new HuTime.XYPosition(0, 0), "abc", 30],
            ["typical", new HuTime.StringStyle("red", "30px"),
                new HuTime.XYPosition(10, 20), "abc", 30]
        ])
        ("%s", (label, style, position, text, rotate) => {
            let obj = new HuTime.String(style, position, text, rotate);
            let json = obj.toJSON();
            let dupObj = HuTime.JSON.parse(json);
            expect(dupObj).toStrictEqual(obj);
        });
    });
});

// ****** HuTime.Drawing ******
describe("HuTime.Drawing", () => {
    describe("pathLine", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathLine(
                value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathLine(
                value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathLine(
                    value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // positions
        test.each(invalidValues().addNumbers().
            add([[new HuTime.PositionBase()]]).add([[undefined, new HuTime.PositionBase()]]).
            add([[new HuTime.PositionBase(), undefined]]).add([[null, null]]))
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, value,0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().add([[new HuTime.PositionBase()]]))
        ("Error-t001: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, value,0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[undefined, new HuTime.PositionBase()]],
            [[new HuTime.PositionBase(), undefined]], [[null, null]]
        ])
        ("Error-r002: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, value,0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[new HuTime.XYPosition(0, 0), new HuTime.XYPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)]],
            [[new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.XYPosition(0, 0)]],
            [[new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.TVPosition(0, 0)]]
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, value,0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathLine(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawLine", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawLine(
                undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.drawLine(
                undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawLine(
                    undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // positions
        test.each(invalidValues().addNumbers().
            add([[new HuTime.PositionBase()]]).add([[undefined, new HuTime.PositionBase()]]).
            add([[new HuTime.PositionBase(), undefined]], [[null, null]]))
        ("Invalid Types: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().add([[new HuTime.PositionBase()]]))
        ("Error-t001: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[undefined, new HuTime.PositionBase()]],
            [[new HuTime.PositionBase(), undefined]], [[null, null]]
        ])
        ("Error-r002: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[new HuTime.XYPosition(0, 0), new HuTime.XYPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)]],
            [[new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.XYPosition(0, 0)]],
            [[new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.TVPosition(0, 0)]]
        ])
        ("Acceptable Type: positions (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, value,0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawLine");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawLine(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathPolygon", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathPolygon(
                value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathPolygon(
                value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathPolygon(
                    value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // positions
        test.each(invalidValues().addNumbers().
            add([[new HuTime.PositionBase()]]).add([[undefined, new HuTime.PositionBase()]]).
            add([[new HuTime.PositionBase(), undefined]]).add([[null, null]]))
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, value,0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().add([[new HuTime.PositionBase()]]))
        ("Error-t001: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, value,0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[undefined, new HuTime.PositionBase()]],
            [[new HuTime.PositionBase(), undefined]], [[null, null]]])
        ("Error-r002: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, value,0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("positions");
        });
        test.each([
            [[new HuTime.XYPosition(0, 0), new HuTime.XYPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)]],
            [[new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.XYPosition(0, 0)]],
            [[new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.TVPosition(0, 0)]]
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, value,0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPolygon(
                layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawPolygon", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPolygon");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                value, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawPolygon(
                undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawPolygon(
                undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, value, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawPolygon(
                    undefined, value, [new HuTime.PositionBase(),new HuTime.PositionBase()], 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // positions
        test.each(invalidValues().addNumbers().
            add([[new HuTime.PositionBase()]]).add([[undefined, new HuTime.PositionBase()]]).
            add([[new HuTime.PositionBase(), undefined]]).add([[null, null]]))
        ("Invalid Types: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().add([[new HuTime.PositionBase()]]))
        ("Error-t001: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("positions");
        });
        test.each([
            [[undefined, new HuTime.PositionBase()]],
            [[new HuTime.PositionBase(), undefined]], [[null, null]]])
        ("Error-r002: positions (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("positions");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, value,0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r002");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("positions");
        });
        test.each([
            [[new HuTime.XYPosition(0, 0), new HuTime.XYPosition(0, 0)]],
            [[new HuTime.TVPosition(0, 0), new HuTime.TVPosition(0, 0)]],
            [[new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.XYPosition(0, 0)]],
            [[new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0),
                new HuTime.TVPosition(0, 0)]]
        ])
        ("Acceptable Type: positions (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, value,0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPolygon");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPolygon(
                undefined, layer, [new HuTime.PositionBase(), new HuTime.PositionBase()], 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathSquare", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathSquare(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathSquare(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathSquare(
                    value, new HuTime.PositionBase(),40, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, value, 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, value,40, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathSquare(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawSquare", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawSquare(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawSquare(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, value, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawSquare(
                    undefined, value, new HuTime.PositionBase(),40, 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, value,40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, value,40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawSquare(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathRect", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                value, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathRect(
                value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                value, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathRect(
                value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                value, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathRect(
                    value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position1 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position1 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position1");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position1");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position1 (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // position2
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position2 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position2 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position2");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position2");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position2 (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathRect(
                layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawRect", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawRect");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(),new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                value, layer, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, value, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawRect(
                undefined, value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, value, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawRect(
                undefined, value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawRect(
                    undefined, value, new HuTime.PositionBase(),new HuTime.PositionBase(), 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position1
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position1 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position1 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position1");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position1");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position1 (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, value, new HuTime.PositionBase(), 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // position2
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position2 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position2 (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position2");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position2");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position2 (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathRect");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawRect(
                undefined, layer, new HuTime.PositionBase(), new HuTime.PositionBase(), 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathCircle", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                value, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathCircle(
                value, new HuTime.PositionBase(),40);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                value, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathCircle(
                value, new HuTime.PositionBase(),40);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                value, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathCircle(
                    value, new HuTime.PositionBase(),40);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, value, 40, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, value,40);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, value, 40, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, value,40);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, value, 40, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, value,40);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathCircle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawCircle", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(),40);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(),40);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawCircle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(),40, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                value, layer, new HuTime.PositionBase(),40);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, value, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawCircle(
                undefined, value, new HuTime.PositionBase(),40);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, value, new HuTime.PositionBase(), 40, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawCircle(
                undefined, value, new HuTime.PositionBase(),40);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, value, new HuTime.PositionBase(),40, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawCircle(
                    undefined, value, new HuTime.PositionBase(),40);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, value, 40, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, value,40);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, value, 40, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, value,40);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, value,40, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, value,40);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathCircle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawCircle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathArc", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathArc(
                value, new HuTime.PositionBase(), 40, 0, 0, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathArc(
                value, new HuTime.PositionBase(), 40, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathArc(
                    value, new HuTime.PositionBase(),40, 0, 0, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, value,40, 0, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, value,40, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, value,40, 0, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // radius
        test.each(invalidValues().add(-1).add(501))
        ("Invalid Types: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([-1, 501])
        ("Error-r001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([
            0, 500, 1.23, "0", "500", "1.23"
        ])
        ("Acceptable Type: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // startAngle
        test.each(invalidValues())
        ("Invalid Types: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // endAngle
        test.each(invalidValues())
        ("Invalid Types: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathArc(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawArc", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawArc(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.drawArc(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawArc(
                    undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, value,40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // radius
        test.each(invalidValues().add(-1).add(501))
        ("Invalid Types: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([-1, 501])
        ("Error-r001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([
            0, 500, 1.23, "0", "500", "1.23"
        ])
        ("Acceptable Type: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // startAngle
        test.each(invalidValues())
        ("Invalid Types: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // endAngle
        test.each(invalidValues())
        ("Invalid Types: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawArc");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawArc(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathPie", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathPie(
                value, new HuTime.PositionBase(), 40, 0, 0, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathPie(
                value, new HuTime.PositionBase(), 40, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathPie(
                    value, new HuTime.PositionBase(),40, 0, 0, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, value,40, 0, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, value,40, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, value,40, 0, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // radius
        test.each(invalidValues().add(-1).add(501))
        ("Invalid Types: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([-1, 501])
        ("Error-r001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("radius");
        });
        test.each([
            0, 500, 1.23, "0", "500", "1.23"
        ])
        ("Acceptable Type: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // startAngle
        test.each(invalidValues())
        ("Invalid Types: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("startAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, value, 0, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // endAngle
        test.each(invalidValues())
        ("Invalid Types: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("endAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPie(
                layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawPie", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPie");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                value, layer, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawPie(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, value, new HuTime.PositionBase(), 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawPie(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, value, new HuTime.PositionBase(),40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawPie(
                    undefined, value, new HuTime.PositionBase(),40, 0, 0, 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, value, 40, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, value,40, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, value,40, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // radius
        test.each(invalidValues().add(-1).add(501))
        ("Invalid Types: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("radius");
        });
        test.each([-1, 501])
        ("Error-r001: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("radius");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("radius");
        });
        test.each([
            0, 500, 1.23, "0", "500", "1.23"
        ])
        ("Acceptable Type: radius (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), value, 0, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // startAngle
        test.each(invalidValues())
        ("Invalid Types: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("startAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("startAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: startAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, value, 0, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // endAngle
        test.each(invalidValues())
        ("Invalid Types: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("endAngle");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("endAngle");
        });
        test.each([
            0, 500, 1.23, -30, "0", "500", "1.23", "-30"
        ])
        ("Acceptable Type: endAngle (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 0, 0, value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathPie");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPie(
                undefined, layer, new HuTime.PositionBase(), 40, 0, 0, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathTriangle", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathTriangle(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathTriangle(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathTriangle(
                    value, new HuTime.PositionBase(),40, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, value, 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, value,40, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathTriangle(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawTriangle", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawTriangle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawTriangle(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
            result = HuTime.Drawing.drawTriangle(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, value, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawTriangle(
                    undefined, value, new HuTime.PositionBase(),40, 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, value,40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, value,40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[1].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[1].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[1].method).toBe("pathTriangle");
            expect(HuTime.ErrorInfos.log[1].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawTriangle(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathPlusMark", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathPlusMark(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathPlusMark(
                value, new HuTime.PositionBase(),40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathPlusMark(
                    value, new HuTime.PositionBase(),40, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, value,40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, value, 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, value,40, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathSquare");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathPlusMark(
                layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawPlusMark", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                value, layer, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawPlusMark(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, value, new HuTime.PositionBase(), 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.drawPlusMark(
                undefined, value, new HuTime.PositionBase(),40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, value, new HuTime.PositionBase(),40, 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawPlusMark(
                    undefined, value, new HuTime.PositionBase(),40, 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value,40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value,40, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, value,40, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
        });
        test.each([
            0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawPlusMark");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawPlusMark(
                undefined, layer, new HuTime.PositionBase(), 40, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("pathImage", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）
        let sampleImage;
        beforeAll(() => {
            global.Image = MockImage;
            sampleImage = new window.Image();
            sampleImage.src = "test/html/testImage.png";
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathImage(value, new HuTime.PositionBase(),
                    sampleImage, 40, 40, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");

            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // img
        test.each(invalidValues()
            .add("test/html/testImage.png"))    // URL指定は現状では受け付けない
        ("Invalid Types: img (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);

            // drawAlternate = true の場合
            canvas = new HTMLCanvasElement();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).not.toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).not.toBeNull();
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });
        test.each(invalidValues())
            ("Error-t001: img (%o)", (value) => {
                let layer = new HuTime.DummyLayer();
                let canvas = new HTMLCanvasElement();
                let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, canvas);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");

                // drawAlternate = true の場合
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, canvas, true);
                expect(result).not.toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, null, true);
                expect(result).not.toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            });
        test.each(["test/html/testImage.png"])    // URL指定は現状では受け付けない
            ("Error-f003: img (%o)", (value) => {
                let layer = new HuTime.DummyLayer();
                let canvas = new HTMLCanvasElement();
                let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, canvas);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f003");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f003");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");

                // drawAlternate = true の場合
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, canvas, true);
                expect(result).not.toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f003");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    value, 40, 40, 0, null, true);
                expect(result).not.toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("f003");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            });
        test.each([     // サイズ無しのImageオブジェクト
            new window.Image(), document.createElement("img")
        ])
        test.each([document.createElement("img")])
        ("Error-f002: img (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("f002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("f002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");

            // drawAlternate = true の場合
            canvas = new HTMLCanvasElement();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).not.toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("f002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).not.toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("f002");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
        });
        test.each([
            new window.Image(), document.createElement("img")
            // URL指定は現状では受け付けない
        ])
        ("Acceptable Type: img (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            if (value instanceof HTMLImageElement)  // each配列がbeforeAllの前に確定されるため
                value = sampleImage;                // test本体でsampleImageを設定
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);

            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);

            // drawAlternate = true の場合
            layer = new HuTime.DummyLayer();
            canvas = new HTMLCanvasElement();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // width
        test.each(invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, canvas, true);
                expect(result).toBeNull();
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, null, true);
                expect(result).toBeNull();
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            }
        });
        test.each(invalidValues().except(null).except(undefined))
        ("Error-t001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, canvas, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, null, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            }
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, canvas, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    "../testImage.png", value, 40, 0, null, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            }
        });
        test.each([
            undefined, null, 0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result;
            if (value !== undefined && value != null) {
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, value, 40, 0, canvas);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, value, 40, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }

            // drawAlternate = true の場合
            layer = new HuTime.DummyLayer();
            canvas = new HTMLCanvasElement();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, null, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // height
        test.each(invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types: height (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, canvas, true);
                expect(result).toBeNull();
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, null, true);
                expect(result).toBeNull();
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            }
        });
        test.each(invalidValues().except(null).except(undefined))
        ("Error-t001: height (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, canvas, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, null, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            }
        });
        test.each([-1, 1001])
        ("Error-r001: height (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");

            // drawAlternate = true の場合
            if (value !== undefined && value != null) {
                layer = new HuTime.DummyLayer();
                canvas = new HTMLCanvasElement();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, canvas, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, null, true);
                expect(result).toBeNull();
                expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
                expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
                expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
                expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            }
        });
        test.each([
            undefined, null, 0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: height (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result;
            if (value !== undefined && value != null) {
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0, canvas);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
                layer = new HuTime.DummyLayer();
                result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                    sampleImage, 40, value, 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }

            // drawAlternate = true の場合
            layer = new HuTime.DummyLayer();
            canvas = new HTMLCanvasElement();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, null, true);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // drawAlternate
        test.each(invalidValues().except(true).except(false).except(undefined).except(null))
        ("Invalid Types: drawAlternate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(true).except(false).except(undefined).except(null))
        ("Error-t001: drawAlternate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("drawAlternate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("drawAlternate");
        });
        test.each([
            undefined, null, true, false
        ])
        ("Acceptable Type: drawAlternate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathImage(layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // src, drawAlternate, width, height の関係
        let defaultWidth = 30;
        let defaultHeight = 30;
        test.each([
            // width, height, drawAlternate, result, finalWidth, finalHeight
            [50,   50,   false, false, null,         null],
            [null, 50,   false, false, null,         null],
            [50,   null, false, false, null,         null],
            [null, null, false, false, null,         null],
            [50,   50,   true,  true,  50,           50],
            [null, 50,   true,  true,  defaultWidth, 50],
            [50,   null, true,  true,  50,           defaultHeight],
            [null, null, true,  true,  defaultWidth, defaultHeight]
        ])
        ("src: Image, unloaded (%#)", (width, height, drawAlternate,
                result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = new window.Image();

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, finalWidth, finalHeight
            [50,   50,   false, true, 50,  50],
            [null, 50,   false, true, 100, 50],
            [50,   null, false, true, 50,  25],
            [null, null, false, true, 200, 100],
            [50,   50,   true,  true, 50,  50],
            [null, 50,   true,  true, 100, 50],
            [50,   null, true,  true, 50,  25],
            [null, null, true,  true, 200, 100]
        ])
        ("src: Image, loaded (%#)", (width, height, drawAlternate,
                result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = new window.Image();
            srcImage.width = 200;
            srcImage.height = 100;

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, finalWidth, finalHeight
            // 現状ではpathImageは非同期処理に対応しないので、URL, invalidと同じ
            [50,   50,   false, false, null,         null],
            [null, 50,   false, false, null,         null],
            [50,   null, false, false, null,         null],
            [null, null, false, false, null,         null],
            [50,   50,   true,  true,  50,           50],
            [null, 50,   true,  true,  defaultWidth, 50],
            [50,   null, true,  true,  50,           defaultHeight],
            [null, null, true,  true,  defaultWidth, defaultHeight]
        ])
        ("src: URL, valid (%#)", (width, height, drawAlternate,
                result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "test/html/testImage.png";

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            [50,   50,   false, false, null,         null],
            [null, 50,   false, false, null,         null],
            [50,   null, false, false, null,         null],
            [null, null, false, false, null,         null],
            [50,   50,   true,  true,  50,           50],
            [null, 50,   true,  true,  defaultWidth, 50],
            [50,   null, true,  true,  50,           defaultHeight],
            [null, null, true,  true,  defaultWidth, defaultHeight]
        ])
        ("src: URL, invalid (%#)", (width, height, drawAlternate,
                result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "invalidURL";

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, finalWidth, finalHeight
            [50,   50,   false, false, null,         null],
            [null, 50,   false, false, null,         null],
            [50,   null, false, false, null,         null],
            [null, null, false, false, null,         null],
            [50,   50,   true,  true,  50,           50],
            [null, 50,   true,  true,  defaultWidth, 50],
            [50,   null, true,  true,  50,           defaultHeight],
            [null, null, true,  true,  defaultWidth, defaultHeight]
        ])
        ("src: URL, empty (%#)", (width, height, drawAlternate,
            result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "";

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, finalWidth, finalHeight
            [50,   50,   false, false, null,         null],
            [null, 50,   false, false, null,         null],
            [50,   null, false, false, null,         null],
            [null, null, false, false, null,         null],
            [50,   50,   true,  true,  50,           50],
            [null, 50,   true,  true,  defaultWidth, 50],
            [50,   null, true,  true,  50,           defaultHeight],
            [null, null, true,  true,  defaultWidth, defaultHeight]
        ])
        ("src: invalid Type (%#)", (width, height, drawAlternate,
            result, finalWidth, finalHeight) => {
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = null;

            let spyOnResolveImageSize = jest.spyOn(HuTime.Drawing, "_resolveImageSize");
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let path = HuTime.Drawing.pathImage(layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(path instanceof CanvasRenderingContext2D).toBe(result);
            expect(path !== null).toBe(result);
            expect(spyOnResolveImageSize.mock.calls.length).toBe(result ? 1 : 0);
            expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(result ? 1 : 0);
            if (result) {
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnResolveImageSize.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
    });
    describe("drawImage", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）
        let sampleImage;    // テスト用のImageオブジェクト（HTMLImageElement）
        beforeAll(() => {
            global.Image = MockImage;
            sampleImage = new window.Image();
            sampleImage.src = "test/html/testImage.png";
        });

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            spyOnGetImageData.mockClear();
        });
        test.each([
            undefined, null, new HuTime.FigureStyle()
        ])
        ("Acceptable Type: style (%#)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(value, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", async (value) => {
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = await HuTime.Drawing.drawImage(undefined, value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", async (value) => {
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = await HuTime.Drawing.drawImage(undefined, value, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            spyOnGetImageData.mockClear();
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", async (value) => {
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(
                undefined, value, new HuTime.PositionBase(),sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = await HuTime.Drawing.drawImage(
                    undefined, value, new HuTime.PositionBase(),sampleImage, 40, 40, 0);
                expect(result).toBe(true);
                expect(spyOnGetImageData.mock.calls.length).toBe(1);
                spyOnGetImageData.mockClear();
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", async(value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", async(value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            spyOnGetImageData.mockClear();
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, value,
                sampleImage, 40, 40, 0);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // img
        test.each(invalidValues())
        ("Invalid Types: img (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();

            // drawAlternate = true の場合
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues())
        ("Error-f001: img (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();

            // drawAlternate = true の場合
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
        });
        test.each([
            "test/html/testImage.png", " test/html/testImage.png",
            "test/html/testImage.png ", " test/html/testImage.png ",
            new Image(), document.createElement("img")
        ])
        ("Error-f101: img (%#)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            if (value instanceof HTMLImageElement) {
                value.width = 200;
                value.height = 100;
                value.src = "test/html/testImage.png";
            }
            let result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f101");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f101");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();

            // drawAlternate = true の場合
            layer = new HuTime.DummyLayer();
            canvas = new HTMLCanvasElement();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f101");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).toBe(true);
            expect(HuTime.ErrorInfos.log[0].code).toBe("f101");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("img");
            spyOnGetImageData.mockClear();
        });
        test.each([
            "test/html/testImage.png", " test/html/testImage.png",
            "test/html/testImage.png ", " test/html/testImage.png ",
            new Image(), document.createElement("img")
        ])
        ("Acceptable Type: img (%#)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            if (value instanceof HTMLImageElement) {
                value.width = 200;
                value.height = 100;
                value.src = "test/html/testImage.png";
            }
            let result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();

            // drawAlternate = true の場合
            layer = new HuTime.DummyLayer();
            canvas = new HTMLCanvasElement();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, canvas, true);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(
                undefined, layer, new HuTime.PositionBase(),
                value, 40, 40, 0, null, true);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // width
        test.each(invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types: width (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().except(null).except(undefined))
        ("Error-t001: width (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            spyOnGetImageData.mockClear();
        });
        test.each([-1, 1001])
        ("Error-r001: width (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("width");
            spyOnGetImageData.mockClear();
        });
        test.each([
            null, undefined, 0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: width (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, value, 40, 0);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // height
        test.each(invalidValues().except(null).except(undefined).add(-1).add(1001))
        ("Invalid Types: height (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().except(null).except(undefined))
        ("Error-t001: height (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            spyOnGetImageData.mockClear();
        });
        test.each([-1, 1001])
        ("Error-r001: height (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("r001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("height");
            spyOnGetImageData.mockClear();
        });
        test.each([
            null, undefined, 0, 1000, 1.23, "0", "1000", "1.23"
        ])
        ("Acceptable Type: height (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, value, 0);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            spyOnGetImageData.mockClear();
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value, canvas);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, value);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
            spyOnGetImageData.mockClear();
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(spyOnGetImageData.mock.calls.length).toBe(1);
                spyOnGetImageData.mockClear();
            }
            else {
                expect(spyOnGetImageData.mock.calls.length).toBe(1);
                spyOnGetImageData.mockClear();
            }
        });

        // drawAlternate
        test.each(invalidValues().except(undefined).except(null)
            .except(true).except(false))
        ("Invalid Types: drawAlternate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBe(false);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            spyOnGetImageData.mockClear();
        });
        test.each(invalidValues().except(undefined).except(null)
            .except(true).except(false))
        ("Error-t001: drawAlternate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("drawAlternate");
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawImage");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("drawAlternate");
            spyOnGetImageData.mockClear();
        });
        test.each([
            undefined, null, true, false
        ])
        ("Acceptable Type: drawAlternate (%o)", async (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, canvas, value);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
            layer = new HuTime.DummyLayer();
            result = await HuTime.Drawing.drawImage(undefined, layer, new HuTime.PositionBase(),
                sampleImage, 40, 40, 0, null, value);
            expect(result).toBe(true);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            spyOnGetImageData.mockClear();
        });

        // src, drawAlternate, width, height の関係
        let defaultWidth = 30;
        let defaultHeight = 30;
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
/*            [50,   50,   false, true, true, 50,           50],
            [null, 50,   false, true, true, defaultWidth, 50],
            [50,   null, false, true, true, 50,           defaultHeight],
            [null, null, false, true, true, defaultWidth, defaultWidth],
// */
            [50,   50,   false, false, null,  null,         null],
            [null, 50,   false, false, null,  null,         null],
            [50,   null, false, false, null,  null,         null],
            [null, null, false, false, null,  null,         null],
            [50,   50,   true,  true,  false, 50,           50],
            [null, 50,   true,  true,  false, defaultWidth, 50],
            [50,   null, true,  true,  false, 50,           defaultHeight],
            [null, null, true,  true,  false, defaultWidth, defaultHeight]
        ])
        ("src: Image, unloaded (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = new window.Image();

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);

            expect(await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate))
                .toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            if (result) {
                expect(spyOnGetImageData).toHaveBeenLastCalledWith(srcImage);
                expect(await mockGetImageData(srcImage)
                    .then(() => { return true; }, () => { return false; })).toBe(getImageDataResolved);
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
            [50,   50,   false, true, true, 50,  50],
            [null, 50,   false, true, true, 100, 50],   // 画像の比率に応じて決められる
            [50,   null, false, true, true, 50,  25],   // 画像の比率に応じて決められる
            [null, null, false, true, true, 200, 100],  // 元の画像のサイズ
            [50,   50,   true,  true, true, 50,  50],
            [null, 50,   true,  true, true, 100, 50],
            [50,   null, true,  true, true, 50,  25],
            [null, null, true,  true, true, 200, 100]
        ])
        ("src: Image, loaded (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = new window.Image();
            srcImage.width = 200;
            srcImage.height = 100;

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);

            expect(await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate))
                .toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            expect(spyOnGetImageData).toHaveBeenLastCalledWith(srcImage);
            expect(await mockGetImageData(srcImage)
                .then(() => { return true; }, () => { return false; })).toBe(getImageDataResolved);
            let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
            expect(size.width).toBe(finalWidth);
            expect(size.height).toBe(finalHeight);
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
            [50,   50,   false, true, true, 50,  50],
            [null, 50,   false, true, true, 100, 50],
            [50,   null, false, true, true, 50,  25],
            [null, null, false, true, true, 200, 100],
            [50,   50,   true,  true, true, 50,  50],
            [null, 50,   true,  true, true, 100, 50],
            [50,   null, true,  true, true, 50,  25],
            [null, null, true,  true, true, 200, 100]
        ])
        ("src: URL, valid (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "test/html/testImage.png";

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);

            expect(await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate))
                .toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            expect(spyOnGetImageData).toHaveBeenLastCalledWith(srcImage);
            let loadedImg = await mockGetImageData(srcImage)
                .then((img) => { return img; }, () => { return null; });
            expect(loadedImg instanceof HTMLImageElement).toBe(getImageDataResolved);
            let size = HuTime.Drawing._resolveImageSize(width, height, loadedImg);
            expect(size.width).toBe(finalWidth);
            expect(size.height).toBe(finalHeight);
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
            [50,   50,   false, false, null,  null,         null],
            [null, 50,   false, false, null,  null,         null],
            [50,   null, false, false, null,  null,         null],
            [null, null, false, false, null,  null,         null],
            [50,   50,   true,  true,  false, 50,           50],
            [null, 50,   true,  true,  false, defaultWidth, 50],
            [50,   null, true,  true,  false, 50,           defaultHeight],
            [null, null, true,  true,  false, defaultWidth, defaultHeight]
        ])
        ("src: URL, invalid (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "invalidURL";

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);

            expect(await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate))
                .toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(1);
            if (result) {
                expect(spyOnGetImageData).toHaveBeenLastCalledWith(srcImage);
                let loadedImg = await mockGetImageData(srcImage)
                    .then((img) => { return img; }, () => { return null; });
                expect(loadedImg instanceof HTMLImageElement).toBe(getImageDataResolved);
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
            [50,   50,   false, false, null,  null,           null],
            [null, 50,   false, false, null,  null,           null],
            [50,   null, false, false, null,  null,           null],
            [null, null, false, false, null,  null,           null],
            [50,   50,   true,  true,  false, 50,             50],
            [null, 50,   true,  true,  false, defaultWidth,   50],
            [50,   null, true,  true,  false, 50,             defaultHeight],
            [null, null, true,  true,  false, defaultWidth,   defaultHeight]
        ])
        ("src: URL, empty (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = "";

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let drawResult = await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(drawResult).toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            if (drawResult) {
                expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(1);
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
        test.each([
            // width, height, drawAlternate, result, getImageDataResolved, finalWidth, finalHeight
            [50,   50,   false, false, null,  null,           null],
            [null, 50,   false, false, null,  null,           null],
            [50,   null, false, false, null,  null,           null],
            [null, null, false, false, null,  null,           null],
            [50,   50,   true,  true,  false, 50,             50],
            [null, 50,   true,  true,  false, defaultWidth,   50],
            [50,   null, true,  true,  false, 50,             defaultHeight],
            [null, null, true,  true,  false, defaultWidth,   defaultHeight]
        ])
        ("src: invalid Type (%#)", async (width, height, drawAlternate,
                result, getImageDataResolved, finalWidth, finalHeight) => {
            let style = new HuTime.FigureStyle();
            let layer = new HuTime.DummyLayer();
            let position = new HuTime.XYPosition(0, 0);
            let canvas = new HTMLCanvasElement();
            let srcImage = null;

            let spyOnGetImageData = jest.spyOn(HuTime.Drawing, "_getImageData");
            let mockGetImageData = jest.fn(HuTime.Drawing._getImageData);
            let spyOnGetImageBackgroundPath =
                jest.spyOn(HuTime.Drawing, "_getImageBackgroundPath");

            let drawResult = await HuTime.Drawing.drawImage(style, layer, position,
                srcImage, width, height, 0, canvas, drawAlternate);
            expect(drawResult).toBe(result);
            expect(spyOnGetImageData.mock.calls.length).toBe(0);
            if (drawResult) {
                expect(spyOnGetImageBackgroundPath.mock.calls.length).toBe(1);
                let size = HuTime.Drawing._resolveImageSize(width, height, srcImage);
                expect(size.width).toBe(finalWidth);
                expect(size.height).toBe(finalHeight);
            }
            spyOnGetImageData.mockClear();
            mockGetImageData.mockClear();
            spyOnGetImageBackgroundPath.mockClear();
        });
    });
    describe("pathString", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.StringStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(),"", 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            // 指定したcanvasが使われる
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            // layerのcanvasが使われる
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, value, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBeNull();
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.pathString(
                undefined, value, new HuTime.PositionBase(),"", 0);
            expect(result).toBeNull();
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, value, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.pathString(
                undefined, value, new HuTime.PositionBase(),"", 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, value, new HuTime.PositionBase(),"", 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.pathString(
                    undefined, value, new HuTime.PositionBase(),"", 0);
                expect(result).toBeInstanceOf(CanvasRenderingContext2D);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, value, "", 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, value,"", 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, value, "", 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, value,"", 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, value,"", 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, value,"", 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // text
        test.each(invalidValues().addNumbers().exceptStrings())
        ("Invalid Types: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().exceptStrings())
        ("Error-t001: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("text");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("text");
        });
        test.each([
            "", " ", "abc", "イロハ",
            "\nabc\r\ndef\nghi\rjkl\r\n", "\r\n", "\n", "\r"
        ])
        ("Acceptable Type: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBeNull();
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBeNull();
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("pathString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.pathString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBeInstanceOf(CanvasRenderingContext2D);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
    describe("drawString", () => {
        const defaultCtx = new CanvasRenderingContext2D();  // 既定のカンバスコンテキスト（比較用）

        // style
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: style (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("style");
        });
        test.each([
            undefined, null, new HuTime.StringStyle()
        ])
        ("Acceptable Type: style (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(),"", 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                value, layer, new HuTime.PositionBase(),"", 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // layer
        test.each(invalidValues().addNumbers())
        ("Invalid Types: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, value, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBe(false);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            result = HuTime.Drawing.drawString(
                undefined, value, new HuTime.PositionBase(),"", 0);
            expect(result).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: layer (%o)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, value, new HuTime.PositionBase(), "", 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
            result = HuTime.Drawing.drawString(
                undefined, value, new HuTime.PositionBase(),"", 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("layer");
        });
        test.each([
            new HuTime.Layer(), new HuTime.TLineLayer(),
            new HuTime.LineChartLayer(), new HuTime.BarChartLayer(),
            new HuTime.DummyLayer()
        ])
        ("Acceptable Type: layer (%#)", (value) => {
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, value, new HuTime.PositionBase(),"", 0, canvas);
            expect(result).toBe(true);
            if (value instanceof HuTime.DummyLayer)     // ダミー以外はjestでgetContextを実行できないため
                expect(value.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            if (value instanceof HuTime.DummyLayer) {   // ダミー以外はjestでgetContextを実行できないため
                result = HuTime.Drawing.drawString(
                    undefined, value, new HuTime.PositionBase(),"", 0);
                expect(result).toBe(true);
                expect(value.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });

        // position
        test.each(invalidValues().addNumbers())
        ("Invalid Types: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, value, "", 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, value,"", 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers())
        ("Error-t001: position (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, value, "", 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, value,"", 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("position");
        });
        test.each([
            new HuTime.XYPosition(0, 0), new HuTime.TVPosition(0, 0),
            new HuTime.RelativeXYPosition(new HuTime.XYPosition(0, 0), 0, 0),
            new HuTime.RelativeTVPosition(new HuTime.XYPosition(0, 0), 0, 0)
        ])
        ("Acceptable Type: position (%#)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, value,"", 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, value,"", 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // text
        test.each(invalidValues().addNumbers().exceptStrings())
        ("Invalid Types: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().exceptStrings())
        ("Error-t001: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("text");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("text");
        });
        test.each([
            "", " ", "abc", "イロハ",
            "\nabc\r\ndef\nghi\rjkl\r\n", "\r\n", "\n", "\r"
        ])
        ("Acceptable Type: text (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), value, 0);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // rotate
        test.each(invalidValues().except(undefined).except(null))
        ("Invalid Types: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().except(undefined).except(null))
        ("Error-t001: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("rotate");
        });
        test.each([
            undefined, null, 0, 30, 123.45, -30, -123.5, 400, -400,
            "0", "30", "123.45", "-30", "-123.5", "400", "-400"
        ])
        ("Acceptable Type: rotate (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let canvas = new HTMLCanvasElement();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value, canvas);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
            expect(canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            layer = new HuTime.DummyLayer();
            result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", value);
            expect(result).toBe(true);
            expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
        });

        // canvas
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Invalid Types: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBe(false);
            expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
        });
        test.each(invalidValues().addNumbers().except(undefined).except(null))
        ("Error-t001: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("Drawing");
            expect(HuTime.ErrorInfos.log[0].method).toBe("drawString");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("canvas");
        });
        test.each([
            undefined, null, new HTMLCanvasElement()
        ])
        ("Acceptable Type: canvas (%o)", (value) => {
            let layer = new HuTime.DummyLayer();
            let result = HuTime.Drawing.drawString(
                undefined, layer, new HuTime.PositionBase(), "", 0, value);
            expect(result).toBe(true);
            if (value instanceof HTMLCanvasElement) {
                expect(layer.canvas.getContext("2d")).toStrictEqual(defaultCtx);
                expect(value.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
            else {
                expect(layer.canvas.getContext("2d")).not.toStrictEqual(defaultCtx);
            }
        });
    });
});

// ****** HuTime.FigureStyle ******
describe("HuTime.FigureStyle", () => {
    // **** コンストラクタ ****
    describe("constructor", () => {
        // fillColor, lineColor, lineWidth
        const initValue = ["black", null, 1];
        const acceptableValue = ["red", "green", 5];
        test("initial", () => {
            let style = new HuTime.FigureStyle();
            expect(style).toBeInstanceOf(HuTime.FigureStyle);
            expect(style.fillColor).toBe(initValue[0]);
            expect(style.lineColor).toBe(initValue[1]);
            expect(style.lineWidth).toBe(initValue[2]);
        });
        test("typical", () => {
            let style = new HuTime.FigureStyle(
                acceptableValue[0], acceptableValue[1], acceptableValue[2]);
            expect(style).toBeInstanceOf(HuTime.FigureStyle);
            expect(style.fillColor).toBe(acceptableValue[0]);
            expect(style.lineColor).toBe(acceptableValue[1]);
            expect(style.lineWidth).toBe(acceptableValue[2]);
        });
    })

    // **** プロパティ ****
    describe("fillColor", () => {
        const initialValue = "black";
        const acceptableValue = "#ff99cc";

        // 不正な型の入力値
        test.each (invalidValues().except(null).addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "fillColor",
               initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).addNumbers().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "fillColor",
                "", value, "t001"));

        // nullの入力値
        test("null", () =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "fillColor",
                acceptableValue, null, null));

        // 文字列の入力値
        test.each ([
            ["blue", "blue"],
            ["BLUE", "blue"],　["Blue", "blue"],
            [" blue", "blue"], ["blue ", "blue"], [" blue ", "blue"],   // 前後余白
            ["#33aacc", "#33aacc"], ["#3ac", "#3ac"],
            ["rgb(0,100,255)", "rgb(0,100,255)"],
            ["rgba(0,100,255,0.5)", "rgba(0,100,255,0.5)"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "fillColor",
                acceptableValue, value, expected));
        test.each ( [
            "", " "
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "fillColor",
               initialValue, acceptableValue, value));
        test.each ( [
            "", " ", "\r\n", "\t"
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "fillColor",
                "", value, "r002"));
    });
    describe("lineColor", () => {
        const initialValue = null;
        const acceptableValue = "#ff99aa";

        // 不正な型の入力値
        test.each (invalidValues().except(null))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "lineColor",
               initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineColor",
                "", value, "t001"));

        // nullの入力値
        test("null", () =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "lineColor",
                acceptableValue, null, null));

        // 文字列の入力値
        test.each ([
            ["blue", "blue"],
            ["BLUE", "blue"],　["Blue", "blue"],
            [" blue", "blue"], ["blue ", "blue"], [" blue ", "blue"],   // 前後余白
            ["#33aacc", "#33aacc"], ["#3ac", "#3ac"],
            ["rgb(0,100,255)", "rgb(0,100,255)"],
            ["rgba(0,100,255,0.5)", "rgba(0,100,255,0.5)"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "lineColor",
                acceptableValue, value, expected));
        test.each ( [
            "", " "
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "lineColor",
               initialValue, acceptableValue, value));
        test.each ( [
            "", " ", "\r\n", "\t"
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineColor",
                "", value, "r002"));
    });
    describe("lineWidth", () => {
        const initialValue = 1;
        const acceptableValue = 2;
        const minValue = 0;
        const maxValue = 500;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "lineWidth",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineWidth",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["5", 5], ["2.3", 2.3],
            ["0", 0], ["500", 500],
            [" 5", 5], ["5 ", 5], [" 5 ", 5]    // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "lineWidth",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "3px", "5.2px",             // 単位付き
            "-1", "-0.1", "501","500.1" // 範囲外
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "lineWidth",
                initialValue, acceptableValue, value));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "3px", "5.2px",             // 単位付き
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineWidth",
                "", value, "r002"));


        // 数値の入力値
        test.each ([
            [5, 5], [2.3, 2.3],
            [minValue, 0], [maxValue, 500]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "lineWidth",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "lineWidth",
                initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            "-1", "-0.1", "501","500.1" // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineWidth",
                "", value, "r001"));
    });
    describe("lineDash", () =>{
        const initialValue = [];
        const acceptableValue = [5, 3];
        const minValue = 1;
        const maxValue = 500;

        // 不正な型の入力値
        test.each (invalidValues().exceptArrays().
            add(((val) => {     // 不正な型の要素を持つ配列
                let result = [];
                val.forEach((a) => {result.push([a])});
                return result;
            })(invalidValues())))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedObject(HuTime.FigureStyle, "lineDash",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptArrays().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "t001"));
        test.each (((val) => {     // 不正な型の要素を持つ配列
            let result = [];
            val.forEach((a) => {result.push([a])});
            return [ result ] ;
        })(invalidValues().exceptStrings()))
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "r002"));

        // 文字列の入力値
        test.each ([
            ["5", [5]], ["2.3", [2.3]],
            ["1", [1]], ["500", [500]],
            [" 5", [5]], ["5 ", [5]], [" 5 ", [5]]    // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.FigureStyle, "lineDash",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",         // 数値なし
            "3px", "5.2px",             // 単位付き
            "0", "0.1", "501","500.1"   // 範囲外
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedObject(HuTime.FigureStyle, "lineDash",
                initialValue, acceptableValue, value));
        test.each([
            "", " ", "a", "イ",         // 数値なし
            "3px", "5.2px",             // 単位付き
        ])
        ("string_Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [5, [5]], [2.3, [2.3]],
            [minValue, [1]], [maxValue, [500]]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.FigureStyle, "lineDash",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedObject(HuTime.FigureStyle, "lineDash",
                initialValue, acceptableValue, value))
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            "0", "0.1", "501","500.1"   // 範囲外
        ])
        ("number_Error_r001(%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "r001"));

        // 配列の入力値
        test.each ([
            [[5], [5]], [[2.3], [2.3]],
            [[minValue], [1]], [[maxValue], [500]],
            [[5, 2.3], [5, 2.3]], [[5, "2.3"], [5, 2.3]]
        ])
        ("Acceptable Arrays (%o)", (value, expected) =>
            testPropertyAcceptableObject(HuTime.FigureStyle, "lineDash",
                acceptableValue, value, expected));
        test.each ([
            [[minValue - 1]], [[minValue - 0.1]], [[maxValue + 1]], [[maxValue + 0.1]],
            [[""]], [[" "]], [["a"]], [["イ"]],
            [[Infinity]], [[-Infinity]], [[NaN]], [[Number.NaN]],
            [["", 5]], [[5, ""]], [["5", ""]], [[5, minValue - 1]], [[5, maxValue + 1]]
        ])
        ("Invalid Arrays (%o)", (value) =>
            testPropertyRejectedObject(HuTime.FigureStyle, "lineDash",
                initialValue, acceptableValue, value));
        test.each ([
            [[minValue - 1]], [[minValue - 0.1]], [[maxValue + 1]], [[maxValue + 0.1]],
            [[5, minValue - 1]], [[5, maxValue + 1]]
        ])
        ("array_Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "r001"));
        test.each ([
            [[""]], [[" "]], [["a"]], [["イ"]],
            [[Infinity]], [[-Infinity]], [[NaN]], [[Number.NaN]],
            [["", 5]], [[5, ""]], [["5", ""]]
        ])
        ("array_Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "lineDash",
                "", value, "r002"));
    });
    describe("alpha", () =>{
        const initialValue = 1.0;
        const acceptableValue = 0.5;
        const minValue = 0;
        const maxValue = 1.0;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "alpha",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "alpha",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["0.1", 0.1], ["0.923", 0.923],
            ["0", 0], ["1", 1],
            [" 0.2", 0.2], ["0.2 ", 0.2], [" 0.2 ", 0.2]    // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "alpha",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "0.1%", "0.923%",           // 単位付き
            "-1", "-0.1", "2", "1.1"    // 範囲外
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "alpha",
                initialValue, acceptableValue, value));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "0.1%", "0.923%",           // 単位付き
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "alpha",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [0.1, 0.1], [0.923, 0.923],
            [minValue, 0], [maxValue, 1]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.FigureStyle, "alpha",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "alpha",
                initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            "-1", "-0.1", "2", "1.1"    // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "alpha",
                "", value, "r001"));
    });
    describe("applyStyle", () => {
        const initialValue = HuTime.FigureStyle.prototype.defaultApplyStyle;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "applyStyle",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptFunctions())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "applyStyle",
                "", value, "t001"));
    });
    describe("applyFillStyle", () => {
        const initialValue = HuTime.FigureStyle.prototype.defaultApplyFillStyle;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "applyFillStyle",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptFunctions())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "applyFillStyle",
                "", value, "t001"));
    });
    describe("applyLineStyle", () => {
        const initialValue = HuTime.FigureStyle.prototype.defaultApplyLineStyle;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.FigureStyle, "applyLineStyle",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptFunctions())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.FigureStyle, "applyLineStyle",
                "", value, "t001"));
    });

    // **** メソッド ****
    describe("defaultApplyStyle", () => {
        // ctx
        test.each(invalidValues().addNumbers())
        ("Invalid Types: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyStyle(value)).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("ctx_Error_t001 (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyStyle(value)).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("FigureStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("defaultApplyStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("ctx");
        });
        test.each([
            new CanvasRenderingContext2D()
        ])
        ("Acceptable Type: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyStyle(value)).toBe(true);
        });

        // fillColor, lineColor, lineWidthの値
        test.each ([
            [undefined, undefined, undefined],
            ["red", "green", 5],
            ["red", undefined, undefined], ["red", "green", undefined], ["red", "green", 1],
            [null, "green", 5], [null, "green", undefined]
        ])
        ("Acceptable style (%#)", (fillColor, lineColor, lineWidth) => {
            let style = new HuTime.FigureStyle(fillColor, lineColor, lineWidth);
            expect(style.defaultApplyStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
        test.each ([
            [null, undefined, undefined],
            [null, "green", 0], [null, null, undefined], [null, null, 5]
        ])
        ("null | 0 style (%#)", (fillColor, lineColor, lineWidth) => {
            let style = new HuTime.FigureStyle(fillColor, lineColor, lineWidth);
            expect(style.defaultApplyStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
    });
    describe("defaultApplyFillStyle", () => {
        // ctx
        test.each(invalidValues().addNumbers())
        ("Invalid Types: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyFillStyle(value)).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("ctx_Error_t001 (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyFillStyle(value)).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("FigureStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("defaultApplyFillStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("ctx");
        });
        test.each([
            new CanvasRenderingContext2D()
        ])
        ("Acceptable Type: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyFillStyle(value)).toBe(true);
        });

        // fillColorの値
        test.each ([
            undefined, "blue", "#33aacc", "#3ac",
            "rgb(0,100,255)","rgba(0,100,255,0.5)"
        ])
        ("Acceptable fillColor (%o)", (value) => {
            let style = new HuTime.FigureStyle(value);
            expect(style.defaultApplyFillStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
        test("null fillColor", () => {
            let style = new HuTime.FigureStyle(null);
            expect(style.defaultApplyFillStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
    });
    describe("defaultApplyLineStyle", () => {
        // ctx
        test.each(invalidValues().addNumbers())
        ("Invalid Types: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle(null, "green");
            expect(style.defaultApplyLineStyle(value)).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("ctx_Error_t001 (%o)", (value) => {
            let style = new HuTime.FigureStyle();
            expect(style.defaultApplyLineStyle(value)).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("FigureStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("defaultApplyLineStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("ctx");
        });
        test.each([
            new CanvasRenderingContext2D()
        ])
        ("Acceptable Type: ctx (%o)", (value) => {
            let style = new HuTime.FigureStyle(null, "green");
            expect(style.defaultApplyLineStyle(value)).toBe(true);
        });

        // lineColorの値
        test.each ([
            "blue", "#33aacc", "#3ac",
            "rgb(0,100,255)","rgba(0,100,255,0.5)"
        ])
        ("Acceptable lineColor (%o)", (value) => {
            let style = new HuTime.FigureStyle(null, value);
            expect(style.defaultApplyLineStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
        test.each ([
            null, undefined
        ])
        ("null lineColor (%o)", (value) => {
            let style = new HuTime.FigureStyle(null, value);
            expect(style.defaultApplyLineStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });

        // lineWidthの値
        test.each ([
            undefined, 1, 10, 500
        ])
        ("Acceptable lineWidth (%o)", (value) => {
            let style = new HuTime.FigureStyle(null, "black", value);
            expect(style.defaultApplyLineStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
        test("0 lineWidth", () => {
            let style = new HuTime.FigureStyle(null, "black", 0);
            expect(style.defaultApplyLineStyle(
                new CanvasRenderingContext2D())).toBe(true);
        });
    });

    // **** JSON出力 ****
    describe("toJSON", () => {
        test.each ([
            // fillColor, lineColor, lineWidth, lineDash, alpha
            ["initial", undefined, undefined, undefined, [], 1.0],
            ["typical", "red", "green", 5, [5, 2], 0.5]
        ])
        ("%s", (fillColor, lineColor, lineWidth,
          lineDash, alpha) => {
            let style = new HuTime.FigureStyle();
            style.fillColor = fillColor;
            style.lineColor = lineColor;
            style.lineWidth = lineWidth;
            style.lineDash = lineDash;
            style.alpha = alpha;

            let json = style.toJSON();
            let dupStyle = HuTime.JSON.parse(json);
            expect(dupStyle).toStrictEqual(style);
        });
    });
});

// ****** HuTime.StringStyle ******
describe("HuTime.StringStyle", () => {
    // **** コンストラクタ ****
    describe("constructor", () => {
        // fontSize, fillColor, fontWeight, fontStyle, fontFamily
        const initValue = ["10px", "black", 400, "normal", "sans-serif"];
        const acceptableValue = ["20px", "#ff99cc", 700, "italic", "serif"];
        test("initial", () => {
            let style = new HuTime.StringStyle();
            expect(style).toBeInstanceOf(HuTime.StringStyle);
            expect(style.fontSize).toBe(initValue[0]);
            expect(style.fillColor).toBe(initValue[1]);
            expect(style.fontWeight).toBe(initValue[2]);
            expect(style.fontStyle).toBe(initValue[3]);
            expect(style.fontFamily).toBe(initValue[4]);
        });
        test("typical", () => {
            let style = new HuTime.StringStyle(
                acceptableValue[0], acceptableValue[1], acceptableValue[2],
                acceptableValue[3], acceptableValue[4]);
            expect(style).toBeInstanceOf(HuTime.StringStyle);
            expect(style.fontSize).toBe(acceptableValue[0]);
            expect(style.fillColor).toBe(acceptableValue[1]);
            expect(style.fontWeight).toBe(acceptableValue[2]);
            expect(style.fontStyle).toBe(acceptableValue[3]);
            expect(style.fontFamily).toBe(acceptableValue[4]);
        });
    })

    // **** プロパティ ****
    describe("fontSize", () => {
        const initialValue = "10px";
        const acceptableValue = "20px";
        const minValue = 0;
        const maxValue = 200;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontSize",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontSize",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["20px", "20px"],
            [" 20px", "20px"], ["20px ", "20px"], [" 20px ", "20px"],     // 前後余白
            [" 20 px", "20px"],                     // 単位の前に余白
            ["0", "0px"], ["20", "20px"]            // 数値文字列（px付きに変換）
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontSize",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "0em", "200rem", "20apx", "20 apx",    // px以外の単位
            "-1px", "-0.1px", "201px", "200.1px",  // 範囲外（単位付き）
            "-1", "-0.1", "201","200.1"             // 範囲外（単位無し）
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontSize",
                initialValue, acceptableValue, value));

        // 数値の入力値
        test.each ([
            [20, "20px"],
            [20.52, "20.52px"],
            [minValue, "0px"], [maxValue, "200px"]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontSize",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontSize",
                initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontSize",
                "", value, "r001"));
    });
    describe("fontStyle", () => {
        const initialValue = "normal";
        const acceptableValue = "italic";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontStyle",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) => {
            let obj = new HuTime.StringStyle();
            obj.fontStyle = value;
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("StringStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("fontStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("");
        });

        // 文字列の入力値
        test.each ([
            ["normal", "normal"], ["oblique", "oblique"], ["italic", "italic"],
            ["NORMAL", "normal"], ["Italic", "italic"],     // 大文字含む
            [" oblique", "oblique"], ["Normal ", "normal"], // 前後余白
            [" Italic ", "italic"]                          // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontStyle",
                acceptableValue, value, expected));
        test.each ([
            "", " ", "a", "イ",      // fontStyleではない文字列
            "0", "-1", "1"          // 数値文字列
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontStyle",
                initialValue, acceptableValue, value));
        test.each ([
            "", " ", "a", "イ",      // fontStyleではない文字列
            "0", "-1", "1"          // 数値文字列
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontStyle",
                "", value, "r002"));
    });
    describe("fontWeight", () => {
        const initialValue = 400;
        const acceptableValue = 700;
        const minValue = 100;
        const maxValue = 900;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontWeight",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontWeight",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["normal", 400], ["bold", 700],
            ["BOLD", 700], ["Bold", 700],                       // 大文字含む
            [" Bold", 700], ["Bold ", 700], [" Bold ", 700],    // 前後余白
            ["400", 400], ["100", 100], ["900", 900],           // 数値文字列
            ["450", 400], ["400.1", 400],                       // 100ずつのステップへ変換
            [" 400", 400], ["400 ", 400], [" 400 ", 400],       // 前後余白ありの数値文字列
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontWeight",
                acceptableValue, value, expected));
        test.each ([
            "lighter", "bolder",                        // サポートなし
            "99", "99.9", "901", "900.1", "0", "-40",   // 範囲外
            "", " ", "a", "イ"                           // フォントウェイトではない
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontWeight",
               initialValue, acceptableValue, value));
        test.each ([
            //"lighter", "bolder",                        // サポートなし
            "", " ", "a", "イ"                           // フォントウェイトではない
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontWeight",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [400, 400], [minValue, minValue], [maxValue, maxValue],
            [450, 400], [400.1, 400]            // 100ずつのステップへ変換
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontWeight",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1,   // 範囲外
            maxValue + 1, maxValue + 0.1,   // 範囲外
            Infinity, -Infinity, NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontWeight",
               initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1,   // 範囲外
            maxValue + 1, maxValue + 0.1,   // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontWeight",
                "", value, "r001"));
    });
    describe("fontFamily", () => {
        const initialValue = "sans-serif";
        const acceptableValue = "serif";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontFamily",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontFamily",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["cursive", "cursive"],
            [" cursive", "cursive"],        // 前後余白
            ["cursive ", "cursive"],        // 前後余白
            [" cursive ", "cursive"],       // 前後余白
            ["Century", "Century"],         // 大文字含む
            ["Bauhaus 93", "Bauhaus 93"],   // 数字含む
            ["游ゴシック", "游ゴシック"]      // 全角文字
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontFamily",
                acceptableValue, value, expected));
        test.each ([
            "", " "
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontFamily",
               initialValue, acceptableValue, value));
    });
    describe("fontVariant", () => {
        const initialValue = "normal";
        const acceptableValue = "small-caps";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontVariant",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontVariant",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["small-caps", "small-caps"],
            [" normal", "normal"],      // 前後余白
            ["normal ", "normal"],      // 前後余白
            [" normal ", "normal"]      // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fontVariant",
                acceptableValue, value, expected));
        test.each ([
            "", " ", "a", "イ",      // fontVariantではない値
            "0", "-1", "1"          // 数値文字列
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fontVariant",
               initialValue, acceptableValue, value));
        test.each ([
            "", " ", "a", "イ", "\r\n", "\t",      // fontVariantではない値
            "0", "-1", "1"          // 数値文字列
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fontVariant",
                "", value, "r002"));
    });
    describe("lineHeight", () => {
        const initialValue = 1;
        const acceptableValue = 2;
        const minMultiHeight = -100;
        const maxMultiHeight = 100;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineHeight",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineHeight",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["20px", "20px"], ["0px", "0px"],           // px指定
            ["-500px", "-500px"], ["500px", "500px"],   // 上限・下限値
            ["20 px", "20px"], ["0 px", "0px"],         // pxと数値の間に空白
            [" 20px", "20px"], ["20px ", "20px"], [" 20px ", "20px"],   // 前後余白
            ["3", 3], ["0", 0],                          // 倍数指定
            ["-100", -100], ["100", 100],           // 上限・下限値
            [" 3", 3], ["3 ", 3], [" 3 ", 3]      // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineHeight",
                acceptableValue, value, expected));
        test.each ([
            "", " ", "a", "イ",
            "20em", "0pt", "0 pt", "100apx", "100 apx", // px以外の単位
            "-501px", "-500.1px", "501px", "500.1px",   // 範囲外（px指定）
            "-101", "-100.1", "101", "100.1"            // 範囲外（倍数指定）
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineHeight",
               initialValue, acceptableValue, value));
        test.each ([
            "", " ", "a", "イ",
            "20em", "0pt", "0 pt", "100apx", "100 apx", // px以外の単位
            "-501px", "-500.1px", "501px", "500.1px",   // 範囲外（px指定）
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineHeight",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [3, 3], [0, 0], [-5, -5],
            [minMultiHeight, minMultiHeight],
            [maxMultiHeight, maxMultiHeight]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineHeight",
                acceptableValue, value, expected));
        test.each ([
            minMultiHeight - 1, minMultiHeight - 0.1,   // 範囲外
            maxMultiHeight + 1, maxMultiHeight + 0.1,   // 範囲外
            Infinity, -Infinity, NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineHeight",
               initialValue, acceptableValue, value));
        test.each ([
            minMultiHeight - 1, minMultiHeight - 0.1,   // 範囲外
            maxMultiHeight + 1, maxMultiHeight + 0.1,   // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineHeight",
                "", value, "r001"));
    });
    describe("font", () => {
        test.each ([
            // fontStyle, fontValiant, fontWeight,
            // fontsize, lineHeight, fontFamily, expected
            ["initial", undefined, undefined, undefined,        // 初期値（入力値はすべて無効のため）
                undefined, undefined, undefined, "400 10px/1 sans-serif"],
            ["typical", "italic", "small-caps", 700, "20px", "2","serif",  // 代表的な値
                "italic small-caps 700 20px/2 serif"],
            ["px lineHeight", undefined, undefined, undefined,  // 行の高さがpx値
                undefined, "12px", undefined, "400 10px/12px sans-serif"],
            ["- lineHeight", undefined, undefined, undefined,   // 行の高さが負の倍数値
                undefined, -2, undefined, "400 10px sans-serif"],
            ["-px lineHeight", undefined, undefined, undefined, // 行の高さが負のpx値
                undefined, "-15px", undefined, "400 10px sans-serif"]
        ])
        ("%s", (label, fontStyle, fontVariant, fontWeight,
          fontSize, lineHeight, fontFamily, expected) => {
            let style = new HuTime.StringStyle();
            style.fontStyle = fontStyle;
            style.fontVariant = fontVariant;
            style.fontWeight = fontWeight;
            style.fontSize = fontSize;
            style.lineHeight = lineHeight;
            style.fontFamily = fontFamily;
            expect(style.font).toBe(expected);
        });
    });
    describe("textAlign", () => {
        const initialValue = "start";
        const acceptableValue = "end";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "textAlign",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "textAlign",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["start", "start"], ["end", "end"],
            ["left", "left"], ["right", "right"], ["center", "center"],
            ["LEFT", "left"], ["Right", "right"],   // 大文字含む
            [" center", "center"],      // 前後余白
            ["center ", "center"],      // 前後余白
            [" center ", "center"]      // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "textAlign",
                acceptableValue, value, expected));
        test.each ([
            "", " ", "a", "イ",      // textAlignではない値
            "0", "-1", "1"          // 数値文字列
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "textAlign",
               initialValue, acceptableValue, value));
        test.each ([
            "", " ", "a", "イ", "\r\n", "\t",    // textAlignではない値
            "0", "-1", "1"                       // 数値文字列
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "textAlign",
                "", value, "r002"));
    });
    describe("textBaseline", () => {
        const initialValue = "alphabetic";
        const acceptableValue = "middle";

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "textBaseline",
               initialValue, acceptableValue, value));
        test.each (invalidValues().addNumbers().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "textBaseline",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["top", "top"], ["hanging", "hanging"], ["middle", "middle"],
            ["alphabetic", "alphabetic"], ["ideographic", "ideographic"],
            ["bottom", "bottom"],
            ["MIDDLE", "middle"], ["Bottom", "bottom"], // 大文字含む
            [" top", "top"], ["top ", "top"], [" top ", "top"]  // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "textBaseline",
                acceptableValue, value, expected));
        test.each ([
            "", " ", "a", "イ",      // textBaselineではない値
            "0", "-1", "1"          // 数値文字列
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "textBaseline",
               initialValue, acceptableValue, value));
        test.each ([
            "", " ", "a", "イ", "\r\n", "\t",   // textBaselineではない値
            "0", "-1", "1"                      // 数値文字列
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "textBaseline",
                "", value, "r002"));
    });
    describe("fillColor", () => {
        const initialValue = "black";
        const acceptableValue = "#ff99cc";

        // 不正な型の入力値
        test.each (invalidValues().except(null).addNumbers())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fillColor",
               initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).addNumbers().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fillColor",
                "", value, "t001"));

        // nullの入力値
        test("null", () =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fillColor",
                acceptableValue, null, null));

        // 文字列の入力値
        test.each ([
            ["blue", "blue"],
            ["BLUE", "blue"],　["Blue", "blue"],
            [" blue", "blue"], ["blue ", "blue"], [" blue ", "blue"],   // 前後余白
            ["#33aacc", "#33aacc"], ["#3ac", "#3ac"],
            ["rgb(0,100,255)", "rgb(0,100,255)"],
            ["rgba(0,100,255,0.5)", "rgba(0,100,255,0.5)"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "fillColor",
                acceptableValue, value, expected));
        test.each ( [
            "", " "
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "fillColor",
               initialValue, acceptableValue, value));
        test.each ( [
            "", " ", "\r\n", "\t"
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "fillColor",
                "", value, "r002"));
    });
    describe("lineColor", () => {
        const initialValue = null;
        const acceptableValue = "#ff99aa";

        // 不正な型の入力値
        test.each (invalidValues().except(null))
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineColor",
                initialValue, acceptableValue, value));
        test.each (invalidValues().except(null).exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineColor",
                "", value, "t001"));

        // nullの入力値
        test("null", () =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineColor",
                acceptableValue, null, null));

        // 文字列の入力値
        test.each ([
            ["blue", "blue"],
            ["BLUE", "blue"],　["Blue", "blue"],
            [" blue", "blue"], ["blue ", "blue"], [" blue ", "blue"],   // 前後余白
            ["#33aacc", "#33aacc"], ["#3ac", "#3ac"],
            ["rgb(0,100,255)", "rgb(0,100,255)"],
            ["rgba(0,100,255,0.5)", "rgba(0,100,255,0.5)"]
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineColor",
                acceptableValue, value, expected));
        test.each ( [
            "", " "
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineColor",
                initialValue, acceptableValue, value));
        test.each ( [
            "", " ", "\r\n", "\t"
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineColor",
                "", value, "r002"));
    });
    describe("lineWidth", () => {
        const initialValue = 0;
        const acceptableValue = 2;
        const minValue = 0;
        const maxValue = 500;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineWidth",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineWidth",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["5", 5], ["2.3", 2.3],
            ["0", 0], ["500", 500],
            [" 5", 5], ["5 ", 5], [" 5 ", 5]    // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineWidth",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "3px", "5.2px",             // 単位付き
            "-1", "-0.1", "501","500.1" // 範囲外
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineWidth",
                initialValue, acceptableValue, value));
        test.each([
            "", " ", "a", "イ", "\r\n", "\t",    // 数値なし
            "3px", "5.2px",                     // 単位付き
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineWidth",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [5, 5], [2.3, 2.3],
            [minValue, 0], [maxValue, 500]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "lineWidth",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "lineWidth",
                initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            "-1", "-0.1", "501","500.1" // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "lineWidth",
                "", value, "r001"));
    });
    describe("alpha", () =>{
        const initialValue = 1.0;
        const acceptableValue = 0.5;
        const minValue = 0;
        const maxValue = 1.0;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "alpha",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptStrings())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "alpha",
                "", value, "t001"));

        // 文字列の入力値
        test.each ([
            ["0.1", 0.1], ["0.923", 0.923],
            ["0", 0], ["1", 1],
            [" 0.2", 0.2], ["0.2 ", 0.2], [" 0.2 ", 0.2]    // 前後余白
        ])
        ("Acceptable Strings (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "alpha",
                acceptableValue, value, expected));
        test.each([
            "", " ", "a", "イ",          // 数値なし
            "0.1%", "0.923%",           // 単位付き
            "-1", "-0.1", "2", "1.1"    // 範囲外
        ])
        ("Invalid Strings (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "alpha",
                initialValue, acceptableValue, value));
        test.each([
            "", " ", "a", "イ", "\r\n", "\t",    // 数値なし
            "0.1%", "0.923%",                   // 単位付き
        ])
        ("Error_r002 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "alpha",
                "", value, "r002"));

        // 数値の入力値
        test.each ([
            [0.1, 0.1], [0.923, 0.923],
            [minValue, 0], [maxValue, 1]
        ])
        ("Acceptable Numbers (%o)", (value, expected) =>
            testPropertyAcceptableValue(HuTime.StringStyle, "alpha",
                acceptableValue, value, expected));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            Infinity, -Infinity, NaN, Number.NaN
        ])
        ("Invalid Numbers (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "alpha",
                initialValue, acceptableValue, value));
        test.each ([
            minValue - 1, minValue - 0.1, maxValue + 1, maxValue + 0.1,     // 範囲外
            "-1", "-0.1", "2", "1.1"    // 範囲外
        ])
        ("Error_r001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "alpha",
                "", value, "r001"));
    });
    describe("applyStyle", () => {
        const initialValue = HuTime.StringStyle.prototype.defaultApplyStyle;
        const acceptableValue = () => {};

        // 不正な型の入力値
        test.each (invalidValues().exceptFunctions())
        ("Invalid Types (%o)", (value) =>
            testPropertyRejectedValue(HuTime.StringStyle, "applyStyle",
               initialValue, acceptableValue, value));
        test.each (invalidValues().exceptFunctions())
        ("Error_t001 (%o)", (value) =>
            testErrorInfo(HuTime.StringStyle, "applyStyle",
                "", value, "t001"));
    });

    // **** メソッド ****
    describe("defaultApplyStyle", () => {
        // ctx
        test.each(invalidValues().addNumbers())
        ("Invalid Types: ctx (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(value, "")).toBe(false);
        });
        test.each(invalidValues().addNumbers())
        ("ctx_Error_t001 (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(value, "")).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("StringStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("defaultApplyStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("ctx");
        });
        test.each([
            new CanvasRenderingContext2D()
        ])
        ("Acceptable Type: ctx (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(value, "")).toBe(true);
        });

        // text
        test.each(invalidValues().addNumbers().exceptStrings())
        ("Invalid Types: text (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(
                new CanvasRenderingContext2D(), value)).toBe(false);
        });
        test.each(invalidValues().addNumbers().exceptStrings())
        ("text_Error_t001 (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(
                new CanvasRenderingContext2D(), value)).toBe(false);
            expect(HuTime.ErrorInfos.log[0].code).toBe("t001");
            expect(HuTime.ErrorInfos.log[0].className).toBe("StringStyle");
            expect(HuTime.ErrorInfos.log[0].method).toBe("defaultApplyStyle");
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("text");
        });
        test.each([
            "", " ", "a\nb", "イロハ"
        ])
        ("Acceptable Type: text (%o)", (value) => {
            let style = new HuTime.StringStyle();
            expect(style.defaultApplyStyle(
                new CanvasRenderingContext2D(), value)).toBe(true);
        });
    });

    // **** JSON出力 ****
    describe("toJSON", () => {
        test.each ([
            // label, fontSize, fontStyle, fontWeight, fontFamily,
            // fontVariant, lineHeight, textAlign, textBaseline,
            // fillColor, lineWidth, lineColor, alpha
            ["initial", undefined, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined,
                undefined, undefined, undefined, undefined],
            ["typical", "20px", "italic", 700, "serif",
                "small-caps", 2, "end", "middle",
                "#ff99cc", 2, "#ff99aa", 0.5]
        ])
        ("%s", (label, fontSize, fontStyle, fontWeight, fontFamily,
          fontVariant, lineHeight, textAlign, textBaseline,
          fillColor, lineWidth, lineColor, alpha) => {
            let style = new HuTime.StringStyle();
            style.fontSize = fontSize;
            style.fontStyle = fontStyle;
            style.fontWeight = fontWeight;
            style.fontFamily = fontFamily;
            style.fontVariant = fontVariant;
            style.lineHeight = lineHeight;
            style.textAlign = textAlign;
            style.textBaseline = textBaseline;
            style.fillColor = fillColor;
            style.lineWidth = lineWidth;
            style.lineColor = lineColor;
            style.alpha = alpha;

            let json = style.toJSON();
            let dupStyle = HuTime.JSON.parse(json);
            expect(dupStyle).toStrictEqual(style);
        });
    });
});
