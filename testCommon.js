// windows.Image / HTMLImageElement のモック
MockImage = jest.fn(() => {});
MockImage.prototype = Object.create(HTMLImageElement.prototype, {
    constructor: {
        value: MockImage
    },
    width: {
        writable: true,
        value: 0
    },
    height: {
        writable: true,
        value: 0
    },
    _src: {
        writable: true,
        value: ""
    },
    src: {
        get: function() { return this._src },
        set: function(val) {
            if (val === "test/html/testImage.png"
                    || val === "http://localhost/test/html/testImage.png") {
                this._src = val;
                this.width = 200;
                this.height = 100;
                this.onload();
            }
            else {
                this._src = "";
                this.width = 0;
                this.height = 0;
                this.onerror(new Event("error"));
            }
        }
    },
    _onload: {
        writable: true,
        value: jest.fn(() => {})
    },
    onload: {
        get: function() { return this._onload; },
        set: function(val) { this._onload = jest.fn(val); },
    },
    _onerror: {
        writable: true,
        value: jest.fn(() => {})
    },
    onerror: {
        get: function() { return this._onerror; },
        set: function(val) { this._onerror = jest.fn(val); },
    }
});

// canvasコンテキストのダミー（jestがサポートしないため）
CanvasRenderingContext2D = class {
    constructor() {
        this._isModified = false;
    }
    get isModified() { return this._isModified; }
    set font(val) { if (val || !val) this._isModified = true; }
    strokeText() { this._isModified = true; }
    fillText() { this._isModified = true; }
    translate() { this._isModified = true; }
    rotate() { this._isModified = true; }
    beginPath() { this._isModified = true; }
    setLineDash() { this._isModified = true; }
    stroke() { this._isModified = true; }
    fill() { this._isModified = true; }
    moveTo() { this._isModified = true; }
    lineTo() { this._isModified = true; }
    arc() { this._isModified = true; }
    closePath() { this._isModified = true; }
    drawImage() { this._isModified = true; }

    measureText() {
        this._isModified = true;
        return { width:0 };
    }
    rect() { this._isModified = true; }
    get width() {
        return 0;
    }
    get isDummy() {
        return true;
    }
};

// canvas要素のダミー（jestがサポートしないため）
HTMLCanvasElement = class {
    constructor() {
        this._ctx = new CanvasRenderingContext2D();
    }
    getContext() {
        return this._ctx;
    }
};

// Layerのダミー
HuTime.DummyLayer = class extends HuTime.Layer {
    constructor() {
        super();
        this._canvas = new HTMLCanvasElement();
    }
}

invalidValues = function invalidValues () {
    return new InvalidValues();
}
InvalidValues = class InvalidValues extends Array {
        constructor(values) {
            super();
            if (values === undefined) {
                this.push(null, undefined, true, false, [], {}, () => {});
                this.push(NaN, Number.NaN, Infinity, -Infinity);
                this.push("", " ", "  ", "\t", "\t\t");
                this.push("\r\n", "\n", "\r", "\r\n\r\n", "\n\n", "\r\r");
            }
            else if (values instanceof Array) {
                values.forEach(a => this.push(a));
            }
        }
        except (val) {
            return new InvalidValues(this.filter(a => a !== val));
        }
        exceptFunctions () {
            return new InvalidValues(this.filter(a => typeof a !== "function"));
        }
        exceptStrings () {
            return new InvalidValues(this.filter(a => typeof a !== "string"));
        }
        exceptArrays () {
            return new InvalidValues(this.filter(a => !(a instanceof Array)));
        }
        add (val) {
            if (val instanceof Array && val.length > 0)
                val.forEach((a) => this.push(a));
            else
                this.push(val);
            return this;
        }
        addNumbers() {
            this.push(0, 1, -1, 0.1, -0.1, 1e30, -1e30, 1e-30, -1e-30);
            return this;
        }
    }

/**
 * クラス内のプロパティに棄却されるべき値を入力した場合のテスト
 * 棄却されるべき値を入力してもプロパティが変化しないことを確認
 * @param obj テストするオブジェクトまたはクラスのコンストラクタ
 * @param property テストするプロパティ名
 * @param initialValue テストするプロパティの初期値
 * @param acceptableValue プロパティが受け取る正当な値
 * @param testValue テストする値
 */
testPropertyRejectedValue = function testPropertyRejectedValue (
  obj, property, initialValue, acceptableValue, testValue) {
    let testClass
    if (typeof obj == "function")
        testClass = new obj();
    else
        testClass = obj;
    testClass[property] = testValue;
    expect(testClass[property]).toBe(initialValue);
    testClass[property] = acceptableValue;
    testClass[property] = testValue;
    expect(testClass[property]).toBe(acceptableValue);
}
testPropertyRejectedObject = function testPropertyRejectedObject (
  obj, property, initialValue, acceptableValue, testValue) {
    let testClass
    if (typeof obj == "function")
        testClass = new obj();
    else
        testClass = obj;
    testClass[property] = testValue;
    expect(testClass[property]).toStrictEqual(initialValue);
    testClass[property] = acceptableValue;
    testClass[property] = testValue;
    expect(testClass[property]).toStrictEqual(acceptableValue);
}

testPropertyAcceptableValue = function testPropertyAcceptableValue (
  obj, property, acceptableValue, testValue, expectedValue) {
    let testClass;
    if (typeof obj == "function")
        testClass = new obj();
    else
        testClass = obj;
    testClass[property] = testValue;
    expect(testClass[property]).toBe(expectedValue);
    testClass[property] = acceptableValue;
    testClass[property] = testValue;
    expect(testClass[property]).toBe(expectedValue);
}
testPropertyAcceptableObject = function testPropertyAcceptableObject (
  obj, property, acceptableValue, testValue, expectedValue) {
    let testClass;
    if (typeof obj == "function")
        testClass = new obj();
    else
        testClass = obj;
    testClass[property] = testValue;
    expect(testClass[property]).toStrictEqual(expectedValue);
    testClass[property] = acceptableValue;
    testClass[property] = testValue;
    expect(testClass[property]).toStrictEqual(expectedValue);
}

// Errorのテスト
testErrorInfo = function testErrorInfo (obj, property, parameter, testValue, code) {
    HuTime.ErrorInfos.clearLog();
    let testObj
    if (typeof obj == "function")
        testObj = new obj();
    else
        testObj = obj;
    testObj[property] = testValue;
    expect(HuTime.ErrorInfos.log[0].code).toBe(code);
    if (typeof obj == "function")
        expect(HuTime.ErrorInfos.log[0].className).toBe(obj.name);
    else
        expect(HuTime.ErrorInfos.log[0].className).toBe(obj.constructor.name);
    expect(HuTime.ErrorInfos.log[0].method).toBe(property);
    expect(HuTime.ErrorInfos.log[0].parameter).toBe(parameter);
}
