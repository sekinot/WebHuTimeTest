//require("../WebHuTime/release/HuTime.js");
require("./debugHuTime.js");
require("./testCommon.js");

/*
describe("test", () => {
    test("test", () => {
        //let a = new HuTime.Error(
        //    HuTime.ErrorTypes.Type, "12345", "クラス名", "メソッド", "変数");
        //expect(a).toBeInstanceOf(HuTime.Error);
        //HuTime.ErrorInfos.mode = HuTime.ErrorInfosMode.Log;
        HuTime.ErrorInfos.outputLevel = HuTime.ErrorLevels.Error;
        //HuTime.ErrorInfos.throwError = true;

        HuTime.ErrorInfos.addErrorInfo("d051", "クラス名", "メソッド", "変数");
        expect(HuTime.ErrorInfos._log.length).toBe(1);

    });
})
// */

// ****** カスタムエラー ******
describe("CustomErrors", () => {
    test("FileError", () => {
        let message = "FileError Test";
        let e = new HuTime.FileError(message);
        expect(e).toBeInstanceOf(HuTime.FileError);
        expect(e.name).toBe("FileError");
        expect(e.message).toBe(message);
    });
});

// ****** ErrorTypes ******
describe("ErrorTypes", () => {
    function TestErrorType (type, name, errorObj) {
        expect(type).toBeInstanceOf(HuTime.ErrorType);
        expect(type.name).toBe(name);
        type.name = null;   // 書き込み禁止のテスト
        expect(type.name).not.toBe(null);
        expect(typeof type.errObject).toBe("function");
        expect(type.errObject.name).toBe(errorObj.name);
        type.errObject = null;  // 書き込み禁止のテスト
        expect(type.errObject).not.toBe(null);
    }

    test("Type", () => {
        TestErrorType(HuTime.ErrorTypes.Type, "Type", TypeError);
    });
    test("Range", () => {
        TestErrorType(HuTime.ErrorTypes.Range, "Range", RangeError);
    });
    test("File", () => {
        TestErrorType(HuTime.ErrorTypes.File, "File", HuTime.FileError);
    });
    test("Drawing", () => {
        TestErrorType(HuTime.ErrorTypes.Drawing, "Drawing", Error);
    });
    test("Other", () => {
        TestErrorType(HuTime.ErrorTypes.Other, "Other", Error);
    });
});

// ****** ErrorLevels ******
describe("ErrorLevels", () => {
    function TestErrorLevel(level, name, value, output) {
        expect(level).toBeInstanceOf(HuTime.ErrorLevel);
        expect(level.name).toBe(name);
        level.name = null;
        expect(level.name).not.toBe(null);
        expect(level.value).toBe(value);
        level.value = null;
        expect(level.value).not.toBe(null);
        expect(typeof level.output).toBe("function");
        expect(level.output.name).toBe(output.name);
        level.output = null;
        expect(level.output).not.toBe(null);
    }

    test("Info", () => {
        TestErrorLevel(HuTime.ErrorLevels.Info, "Info", 0, console.info);
    });
    test("Warn", () => {
        TestErrorLevel(HuTime.ErrorLevels.Warn, "Warn", 1, console.warn);
    });
    test("Error", () => {
        TestErrorLevel(HuTime.ErrorLevels.Error, "Error", 2, console.error);
    });
});

// ****** ErrorInfo ******
describe("ErrorInfo", () => {
    test("known code", () => {
        let code = "t001";
        let className = "CLASS";
        let method = "METHOD";
        let variable = "VARIABLE";
        let info = new HuTime.ErrorInfo(code, className, method, variable);
        expect(info).toBeInstanceOf(HuTime.ErrorInfo);

        expect(info.code).toBe(code);
        info.code = null;
        expect(info.code).not.toBe(null);
        expect(info.className).toBe(className);
        info.className = null;
        expect(info.className).not.toBe(null);
        expect(info.method).toBe(method);
        info.method = null;
        expect(info.method).not.toBe(null);
        expect(info.parameter).toBe(variable);
        info.variable = null;
        expect(info.parameter).not.toBe(null);

        expect(info.type).toBe(HuTime.ErrorCodes[code].type);
        info.type = null;
        expect(info.type).not.toBe(null);
        expect(info.level).toBe(HuTime.ErrorCodes[code].level);
        info.type = null;
        expect(info.level).not.toBe(null);
        expect(info.message).toBe(HuTime.ErrorCodes[code].message);
        info.type = null;
        expect(info.message).not.toBe(null);
    });
    test("unknown code", () => {
        let code = "";
        let className = "CLASS";
        let method = "METHOD";
        let variable = "VARIABLE";
        let info = new HuTime.ErrorInfo(code, className, method, variable);
        expect(info).toBeInstanceOf(HuTime.ErrorInfo);

        expect(info.code).toBe("o001");
        expect(info.className).toBe(className);
        expect(info.method).toBe(method);
        expect(info.parameter).toBe(variable);

        expect(info.type).toBe(HuTime.ErrorCodes["o001"].type);
        expect(info.level).toBe(HuTime.ErrorCodes["o001"].level);
        expect(info.message).toBe(HuTime.ErrorCodes["o001"].message);
    });
});

// ****** ErrorCodes ******
describe("ErrorCodes", () => {
    function testErrorCodes(code) {
        expect(HuTime.ErrorCodes[code]).toHaveProperty("type");
        expect(HuTime.ErrorCodes[code].type).toBeInstanceOf(HuTime.ErrorType);
        expect(HuTime.ErrorCodes[code]).toHaveProperty("level");
        expect(HuTime.ErrorCodes[code].level).toBeInstanceOf(HuTime.ErrorLevel);
        expect(HuTime.ErrorCodes[code]).toHaveProperty("messageEn");
        expect(typeof HuTime.ErrorCodes[code].messageEn).toBe("string");
        expect(HuTime.ErrorCodes[code]).toHaveProperty("messageJa");
        expect(typeof HuTime.ErrorCodes[code].messageJa).toBe("string");
        expect(HuTime.ErrorCodes[code]).toHaveProperty("message");
        expect(typeof HuTime.ErrorCodes[code].message).toBe("string");
        HuTime.ErrorCodes.init("en");
        expect(HuTime.ErrorCodes[code].message).toBe(HuTime.ErrorCodes[code].messageEn);
        HuTime.ErrorCodes.init("ja");
        expect(HuTime.ErrorCodes[code].message).toBe(HuTime.ErrorCodes[code].messageJa);
    }

    test("", () => {
        for (let code in HuTime.ErrorCodes) {
            if (HuTime.ErrorCodes.hasOwnProperty(code) && typeof code == "object")
                testErrorCodes(code);
        }
    });
});

// ****** ErrorInfosMode ******
describe("ErrorInfosMode", () =>{
   test("modes", () => {
       expect(HuTime.ErrorInfosMode).toHaveProperty("Silent", 0);
       expect(HuTime.ErrorInfosMode).toHaveProperty("Log", 1);
       expect(HuTime.ErrorInfosMode).toHaveProperty("Classified", 2);
   })
});

// ****** ErrorInfos ******
describe("ErrorInfos", () => {
    // **** プロパティ ****
    describe("mode", () => {
        let initialValue = HuTime.Settings.ErrorInfos.mode;
        let acceptableValue = HuTime.ErrorInfosMode.Classified;

        // 不正な型の入力値
        test.each (invalidValues())
        ("Invalid Types (%o)", (value) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyRejectedValue(HuTime.ErrorInfos, "mode",
                initialValue, acceptableValue, value);
        });

        // 正当な入力値
        test.each ([
            [HuTime.ErrorInfosMode.Log, HuTime.ErrorInfosMode.Log],
            [HuTime.ErrorInfosMode.Silent, HuTime.ErrorInfosMode.Silent],
        ])
        ("Acceptable Values (%#)", (value, expected) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyAcceptableValue(HuTime.ErrorInfos, "mode",
                acceptableValue, value, expected);
        });

        // 動作状況
        test("action", () => {
            let spyLog = jest.spyOn(console, "log");
            expect(HuTime.ErrorLevels.Info.output).toBe(console.info);  // mockを設定する前にチェック
            let spyInfo = jest.spyOn(HuTime.ErrorLevels.Info, "output");
            expect(HuTime.ErrorLevels.Warn.output).toBe(console.warn);
            let spyWarn = jest.spyOn(HuTime.ErrorLevels.Warn, "output");
            expect(HuTime.ErrorLevels.Error.output).toBe(console.error);
            let spyError = jest.spyOn(HuTime.ErrorLevels.Error, "output");
            HuTime.Settings.ErrorInfos.reset();
            HuTime.Settings.ErrorInfos.outputLevel = HuTime.ErrorLevels.Info;

            // Silent
            HuTime.ErrorInfos.mode = HuTime.ErrorInfosMode.Silent;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            spyInfo.mockClear();
            spyWarn.mockClear();
            spyError.mockClear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE1");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE2");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);

            // Log
            HuTime.ErrorInfos.mode = HuTime.ErrorInfosMode.Log;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            spyInfo.mockClear();
            spyWarn.mockClear();
            spyError.mockClear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(1);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE1");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(2);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE2");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(3);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(0);

            // Classified
            HuTime.ErrorInfos.mode = HuTime.ErrorInfosMode.Classified;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            spyInfo.mockClear();
            spyWarn.mockClear();
            spyError.mockClear();
            console.clear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(0);
            expect(spyError).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE1");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(0);
            expect(spyWarn).toHaveBeenCalledTimes(1);
            expect(spyError).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE2");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(0);
            expect(spyInfo).toHaveBeenCalledTimes(1);
            expect(spyWarn).toHaveBeenCalledTimes(1);
            expect(spyError).toHaveBeenCalledTimes(1);
        });
    });
    describe("outputLevel", () => {
        let initialValue = HuTime.ErrorLevels.Error;
        let acceptableValue = HuTime.ErrorLevels.Warn;

        // 不正な型の入力値
        test.each (invalidValues().addNumbers())
        ("Invalid Types (%o)", (value) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyRejectedObject(HuTime.ErrorInfos, "outputLevel",
                initialValue, acceptableValue, value);
        });

        // 正当な入力値
        test.each ([
            [HuTime.ErrorLevels.Warn, HuTime.ErrorLevels.Warn],
            [HuTime.ErrorLevels.Info, HuTime.ErrorLevels.Info],
        ])
        ("Acceptable Values (%#)", (value, expected) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyAcceptableObject(HuTime.ErrorInfos, "outputLevel",
                acceptableValue, value, expected);
        });

        // 動作状況
        test("action", () => {
            let spyLog = jest.spyOn(console, "log");
            HuTime.Settings.ErrorInfos.reset();
            HuTime.ErrorInfos.mode = HuTime.ErrorInfosMode.Log;
            HuTime.ErrorInfos.outputLevel = HuTime.ErrorLevels.Error;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE1");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE2");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(1);

            HuTime.ErrorInfos.outputLevel = HuTime.ErrorLevels.Warn;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE3");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE4");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(2);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE5");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(2);

            HuTime.ErrorInfos.outputLevel = HuTime.ErrorLevels.Info;
            HuTime.ErrorInfos.clearLog();
            spyLog.mockClear();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE6");
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(spyLog).toHaveBeenCalledTimes(1);
            HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE7");
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(spyLog).toHaveBeenCalledTimes(2);
            HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE8");
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(spyLog).toHaveBeenCalledTimes(3);
        })
    });
    describe("throwError", () => {
        let initialValue = false;
        let acceptableValue = true;

        // 不正な型の入力値
        test.each (invalidValues().addNumbers().except(true).except(false))
        ("Invalid Types (%o)", (value) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyRejectedValue(HuTime.ErrorInfos, "throwError",
                initialValue, acceptableValue, value);
        });

        // 正当な入力値
        test.each ([
            [true, true], [false, false],
        ])
        ("Acceptable Values (%#)", (value, expected) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyAcceptableValue(HuTime.ErrorInfos, "throwError",
                acceptableValue, value, expected);
        });

        // 動作状況
        test("action", () => {
            HuTime.Settings.ErrorInfos.reset();
            HuTime.ErrorInfos.throwError = true;
            HuTime.ErrorInfos.clearLog();
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            }).toThrow(TypeError);
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("r001", "CLASS", "METHOD", "VARIABLE1");
            }).toThrow(RangeError);
            expect(HuTime.ErrorInfos.log.length).toBe(2);
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("d051", "CLASS", "METHOD", "VARIABLE1");
            }).not.toThrow();
            expect(HuTime.ErrorInfos.log.length).toBe(3);
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("f101", "CLASS", "METHOD", "VARIABLE1");
            }).not.toThrow();
            expect(HuTime.ErrorInfos.log.length).toBe(4);

            HuTime.ErrorInfos.throwError = false;
            HuTime.ErrorInfos.clearLog();
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("t001", "CLASS", "METHOD", "VARIABLE0");
            }).not.toThrow();
            expect(HuTime.ErrorInfos.log.length).toBe(1);
            expect(() => {
                HuTime.ErrorInfos.addErrorInfo("r001", "CLASS", "METHOD", "VARIABLE1");
            }).not.toThrow();
            expect(HuTime.ErrorInfos.log.length).toBe(2);
        });
    });
    describe("logSize", () => {
        let initialValue = 30;
        let acceptableValue = 50;

        // 不正な型の入力値
        test.each (invalidValues().add(-1).add(301))
        ("Invalid Types (%o)", (value) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyRejectedValue(HuTime.ErrorInfos, "logSize",
                initialValue, acceptableValue, value);
        });

        // 正当な入力値
        test.each ([
            [0, 0], [100, 100], [300, 300], ["0", 0], ["100", 100], ["300", 300],
        ])
        ("Acceptable Values (%#)", (value, expected) => {
            HuTime.Settings.ErrorInfos.reset();
            testPropertyAcceptableValue(HuTime.ErrorInfos, "logSize",
                acceptableValue, value, expected);
        });

        // 動作状況
        test("action", () => {
            HuTime.Settings.ErrorInfos.reset();
            HuTime.ErrorInfos.logSize = 5;
            HuTime.ErrorInfos.clearLog();
            expect(HuTime.ErrorInfos.log.length).toBe(0);
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE0");
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE1");
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE2");
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE3");
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE4");
            expect(HuTime.ErrorInfos.log.length).toBe(5);
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("VARIABLE4");
            HuTime.ErrorInfos.addErrorInfo("o001", "CLASS", "METHOD", "VARIABLE5");
            expect(HuTime.ErrorInfos.log.length).toBe(5);
            expect(HuTime.ErrorInfos.log[0].parameter).toBe("VARIABLE5");
        })
    });
});


