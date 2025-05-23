// OOP IN JAVASCRIPT

// Ví dụ về phương thức của object
function objectMethod() {
    let obj = { count: 0 };
    obj.increment = function(amount) {
        // khi ham này được gọi, 'this' sẽ tham chiếu đến object obj
        // , không tham chiếu đến window(đối tượng toàn cục)
        this.count += amount;
        return this.count;
    };
    console.log("obj.increment(1):", obj.increment(1));
    console.log("obj.increment(3):", obj.increment(3));
}
// objectMethod();

//------------------------------------------------------------------------------------//

// Ví dụ về 'this' trong phương thức
function methodThis() {
    let o = { oldProp: 'this is an old property' };
    o.aMethod = function() {
        this.newProp = "this is a new property";
        return Object.keys(this);
    };
    console.log("o.aMethod():", o.aMethod()); // o.aMethod(): [ 'oldProp', 'aMethod', 'newProp' ]

    // Ví dụ 'this' trong hàm non-method (chạy trong môi trường global, không "use strict")
    function globalThisFunction() {
        console.log("Global 'this':", this); // trả về Object [global] 
    }
    globalThisFunction();

    // Ví dụ 'this' trong hàm non-method với "use strict"
    function strictThisFunction() {
        "use strict";
        console.log("Strict 'this':", this); // Strict 'this': undefined
        // vì không có đối tượng nào được tham chiếu đến
    }
    strictThisFunction();
}
// methodThis();

//-----------------------------------------------------------------------------------//

// Hàm có thể có thuộc tính
function functionProperties() {
    function plus1(value) {
        if (plus1.invocations === undefined) {
            plus1.invocations = 0;
        }
        plus1.invocations++;
        return value + 1;
    }
    plus1(10);
    plus1(20);
    console.log("Số lần gọi hàm plus1:", plus1.invocations);// 2
}
// functionProperties();

//-----------------------------------------------------------------------------------//

// Các phương thức của hàm
function functionMethods() {
    function func(arg) { console.log("Func's this and arg:", this, arg); }
    console.log("func.toString():", func.toString());

    console.log("Gọi func.call({t: 1}, 2):");
    func.call({ t: 1 }, 2);

    console.log("Gọi func.apply({t: 2}, [3]):");
    func.apply({ t: 2 }, [3]);

    let newFuncBound = func.bind({ z: 2 }, 3);
    console.log("Gọi newFuncBound() sau khi bind:");
    newFuncBound();
}
// functionMethods();


//-----------------------------------------------------------------------------------//

// // Sử dụng hàm làm constructor
// function Rectangle(width, height) {
//   this.width = width;
//   this.height = height;
//   this.area_inefficient = function() { return this.width * this.height; };
// }
// let r_constructor = new Rectangle(26, 14);
// console.log("Instance r_constructor:", r_constructor);
// console.log("r_constructor.constructor.name:", r_constructor.constructor.name);
// console.log("Diện tích (cách không tối ưu):", r_constructor.area_inefficient());

// console.log("---");

// // Sử dụng prototype để định nghĩa phương thức
// function BetterRectangle(width, height) {
//   this.width = width;
//   this.height = height;
// }
// BetterRectangle.prototype.area = function() {
//   return this.width * this.height;
// };
// let r2_prototype = new BetterRectangle(26, 14);
// let v_area = r2_prototype.area();
// console.log("Diện tích (qua prototype):", v_area);
// console.log("Object.keys(r2_prototype):", Object.keys(r2_prototype));

// BetterRectangle.prototype.getDimensions = function() {
//   return `Width: ${this.width}, Height: ${this.height}`;
// };
// console.log("Kích thước r2_prototype:", r2_prototype.getDimensions());

// console.log("---");

// // Phân biệt instance vs prototype modification
// function Parent(gender) {
//   this.gender = gender;
// }
// Parent.prototype.yellAtChild = function() {
//   console.log('Somebody gonna get a hurt real bad!');
// };
// var dad = new Parent('male');
// var mom = new Parent('female');
// dad.yellAtChild();
// mom.yellAtChild();

// Parent.prototype.yellAtChild = function() {
//   console.log('You are grounded.');
// };
// dad.yellAtChild();
// mom.yellAtChild();

// dad.yellAtChild = function() { console.log('Dad says: Shut up!'); };
// mom.yellAtChild = function() { console.log('Mom says: Go to bed!'); };
// dad.yellAtChild();
// mom.yellAtChild();

// console.log("---");

// // Ví dụ thiết lập kế thừa (đơn giản)
// function Shape(name) {
//   this.name = name;
// }
// Shape.prototype.getShapeName = function() {
//   return this.name;
// };

// function Circle(radius, name) {
//   Shape.call(this, name);
//   this.radius = radius;
// }
// Circle.prototype = Object.create(Shape.prototype);
// Circle.prototype.constructor = Circle;

// Circle.prototype.getCircleArea = function() {
//   return Math.PI * this.radius * this.radius;
// };
// let myCircle = new Circle(5, "MyCircleInstance");
// console.log("Tên hình tròn:", myCircle.getShapeName());
// console.log("Diện tích hình tròn:", myCircle.getCircleArea());

// console.log("---");

// // Cú pháp class trong ES6
// class ShapeES6 {
//   constructor(name) {
//     this.name = name;
//   }
//   getShapeName() {
//     return `Shape name: ${this.name}`;
//   }
// }

// class RectangleES6 extends ShapeES6 {
//   constructor(height, width, name) {
//     super(name);
//     this.height = height;
//     this.width = width;
//   }
//   area() {
//     return this.width * this.height;
//   }
//   static countRects() {
//     return "Đang đếm số hình chữ nhật...";
//   }
// }
// let r_es6 = new RectangleES6(10, 20, "Rect1_ES6");
// console.log("Tên hình (ES6):", r_es6.getShapeName());
// console.log("Diện tích (ES6):", r_es6.area());
// console.log("Gọi phương thức tĩnh:", RectangleES6.countRects());

// console.log("---");

// // Ví dụ Encapsulation (sử dụng ES6 class)
// class PersonEncapsulation {
//   constructor(name, id) {
//     this.name = name;
//     this.id = id;
//     let _address = '';
//     this.setAddress = function(add) { _address = add; };
//     this.getAddress = function() { return _address; };
//   }
//   getDetails() {
//     console.log(`Name is ${this.name}, Address is: ${this.getAddress()}`);
//   }
// }
// let person1Encap = new PersonEncapsulation('Mukul Encap', 21);
// person1Encap.setAddress('Delhi');
// person1Encap.getDetails();

// console.log("---");

// // Ví dụ Abstraction (sử dụng closure để tạo biến "private")
// function personAbstraction(fname, lname) {
//   let firstname = fname;
//   let lastname = lname;
//   // let getDetails_noaccess = function() { // This function is not accessible from outside
//   //   return `First name is: ${firstname} Last name is: ${lastname}`;
//   // };
//   this.getDetails_access = function() {
//     return `First name is: ${firstname}, Last name is: ${lastname}`;
//   };
// }
// let person1Abstr = new personAbstraction('Mukul Abstr', 'Latiyan');
// console.log(person1Abstr.getDetails_access());

// console.log("---");

// // Ví dụ kế thừa đầy đủ với ES6 class
// class PersonBase {
//   constructor(name) { this.name = name; }
//   toString() { return `Name of person: ${this.name}`; }
// }
// class Student extends PersonBase {
//   constructor(name, id) {
//     super(name);
//     this.id = id;
//   }
//   toString() {
//     return `${super.toString()}, Student ID: ${this.id}`;
//   }
// }
// let student1 = new Student('Mukul Student', 22);
// console.log(student1.toString());

// console.log("---");

// // --- Lập trình Hàm (Functional Programming) ---
// let anArr = [1, 2, 3, 4];
// let newArrImperative = [];
// for (let i = 0; i < anArr.length; i++) {
//   newArrImperative[i] = anArr[i] * i;
// }
// console.log("Mảng (mệnh lệnh):", newArrImperative);

// let newArrFunctional = anArr.map(function(val, ind) {
//   return val * ind;
// });
// console.log("Mảng (hàm - function expression):", newArrFunctional);

// let newArrFunctionalArrow = anArr.map((val, ind) => val * ind);
// console.log("Mảng (hàm - arrow function):", newArrFunctionalArrow);

// console.log("---");

// // Hàm thuần khiết
// const addPure = (a, b) => a + b;
// console.log("addPure(2, 3):", addPure(2, 3));

// // Hàm bất thuần
// let SECRET = 42;
// const getIdImpure = (a) => SECRET * a;
// console.log("getIdImpure(2) khi SECRET=42:", getIdImpure(2));
// SECRET = 10;
// console.log("getIdImpure(2) khi SECRET=10:", getIdImpure(2));

// console.log("---");

// // Ví dụ các hàm thuần khiết
// const filterEven = x => x % 2 === 0;
// console.log("[1, 2, 3, 4].filter(filterEven):", [1, 2, 3, 4].filter(filterEven));

// const doubleMap = x => 2 * x; // Renamed from 'double' to avoid conflict if this cell is run multiple times
// console.log("[1, 2, 3].map(doubleMap):", [1, 2, 3].map(doubleMap));

// const sumReducer = (accumulatedSum, arrayItem) => accumulatedSum + arrayItem;
// console.log("[1, 2, 3].reduce(sumReducer, 0):", [1, 2, 3].reduce(sumReducer, 0));

// console.log("[1, 2].concat([3, 4]):", [1, 2].concat([3, 4]));

// console.log("---");

// // --- JavaScript Closures ---
// const makeCounter = (function() {
//   let counter = 0;
//   return function() {
//     counter += 1;
//     return counter;
//   };
// })();
// console.log("Gọi makeCounter lần 1:", makeCounter());
// console.log("Gọi makeCounter lần 2:", makeCounter());
// console.log("Gọi makeCounter lần 3:", makeCounter());

// console.log("---");

// // --- JavaScript: The Bad Parts ---
// function asiProblem() {
//   return
//     "Giá trị này sẽ không được trả về";
// }
// console.log("Kết quả asiProblem():", asiProblem());

// console.log("(' ' == '0') is", (' ' == '0'));
// console.log("(0 == '') is", (0 == ''));
// console.log("(0 == '0') is", (0 == '0'));
// console.log("(false == '0') is", (false == '0'));
// console.log("(null == undefined) is", (null == undefined));
// console.log("(0 === '') is", (0 === ''));
// console.log("(null === undefined) is", (null === undefined));

// console.log("---");

// // --- Một số Idiom Phổ biến ---
// let options = {};
// let hostname = options.hostname || "localhost";
// let port = options.port || 80;
// console.log(`Hostname: ${hostname}, Port: ${port}`);

// let objWithProp = { propname: "Giá trị thuộc tính" };
// let objWithoutProp = null;
// let prop1 = objWithProp && objWithProp.propname;
// let prop2 = objWithoutProp && objWithoutProp.propname;
// console.log("prop1:", prop1);
// console.log("prop2:", prop2);

// const fileReaderSimulator = {
//   fileName: "myFile.txt",
//   readFile: function(fileNo, callback) {
//     setTimeout(() => callback(null, `Data from file ${fileNo}`), 10); // Pass null for err for simplicity
//   },
//   processFileProblem: function(fileNo) {
//     this.readFile(fileNo, function(err, data) {
//       // console.log("Problem: 'this' trong callback:", this.fileName, fileNo, data); // 'this' is not fileReaderSimulator
//     });
//   },
//   processFileWithSelf: function(fileNo) {
//     let self = this;
//     this.readFile(fileNo, function(err, data) {
//       console.log("Self: ", self.fileName, fileNo, data);
//     });
//   },
//   processFileWithArrow: function(fileNo) {
//     this.readFile(fileNo, (err, data) => {
//       console.log("Arrow: ", this.fileName, fileNo, data);
//     });
//   }
// };

// // fileReaderSimulator.processFileProblem(1); // Commented out to avoid error in console
// fileReaderSimulator.processFileWithSelf(2);
// fileReaderSimulator.processFileWithArrow(3);