let c = 5;
const d = 10;
// var và let
function foo(){
    console.log(a); // undefined => hoisted từ hàm for, bình thường sẽ lỗi
    for(var i = 0; i < 5; i++){
        var a = 1;
        let b = 1;
    }
    console.log(i); // 5 , i được khai báo trong for nhưng sử dụng được ở ngoài
    console.log(a); // 1 , a được khai báo trong for nhưng sử dụng được ở ngoài
    console.log(typeof(b));// undefined // b khai báo trong for nhưng không sử dụng được ở ngoài
    // typeof được thiết kế để không báo lỗi khi biến chưa được khai báo
    // nó sẽ trả về undefined
    c = 2;
    // var is function scoped, so it is accessible here
}

// foo();
// console.log(c); // 2

//---------------------------------------------------------------------------------------------------------//

function dataType(){
    // Khai báo và thay đổi kiểu dữ liệu của biến
    var i;
    console.log("typeof i:", typeof i); // typeof i == 'undefined'
    i = 32;
    console.log("i =", i, ", typeof i:", typeof i); // typeof i == 'number'
    i = "foobar";
    console.log("i =", i, ", typeof i:", typeof i); // typeof i == 'string'
    i = true;
    console.log("i =", i, ", typeof i:", typeof i); // typeof i == 'boolean'
    i = null;
    console.log("i =", i, ", typeof i:", typeof i); // typeof i == 'object'
    let x = "abc";
    // Lots of useful methods: indexOf(), charAt(), match(), search(), replace(),
    // toUpperCase(), toLowerCase(), slice(), substr(), substring(), trim(), split()
    // bitwise operators (e.g. ~, &, |, ^, >>, <<, >>>) are 32bit!
    console.log(1/0 == Infinity); // true
    console.log(typeof(Infinity), typeof(NaN)); // number number
    console.log(Math.sqrt(-1)); // NaN
    console.log(0.1 + 0.2 == 0.3); // false
    console.log(0.1 + 0.2); // 0.30000000000000004
    console.log(~7); // -8
    console.log("8 >> 2:", 8 >> 2); // 2 , 1000 >> 2 = 0010
    console.log("2 << 2:", 2 << 2); //8 , 0010 << 2 = 1000
    console.log("-8 >> 2:", -8 >> 2); // -2 , 11111111111111111111111111111000 >> 2 = 11111111111111111111111111111110 = (bù 2) = (bù 1) + 1
    // => (bù 1) = 11111111111111111111111111111101 => (ban đầu) = 10000000000000000000000000000000010 = -2
    // Máy tính biểu diễn số theo dạng bù 2
    console.log("-8 >>> 2:", -8 >>> 2); // 1073741822 , 11111111111111111111111111111000 >>> 2 = 00111111111111111111111111111000(bù 2) = 1073741822
    console.log("2^31 << 2:", Math.pow(2, 31) << 2); // 0
    console.log("2^31 >> 31:", Math.pow(2, 31) >> 31); // -1
    // Theo cách biểu diễn của máy tính thì 2^31 = 10000000000000000000000000000000 và là 1 số âm
    console.log("2^31 >>> 31:", Math.pow(2, 31) >>> 31); // 1, phép dịch phải logic dịch luôn cả bit dấu
    console.log(x + "123"); // abc123
    console.log("123" + 123); // 123123
    console.log(123 + "123"); // 123123
    console.log("123" - 123); // 0
}
// dataType();


//---------------------------------------------------------------------------------------------------------//


// Hàm đệ quy
function factorial(n){
    if(n == 1){
        return 1;
    }
    return n * factorial(n - 1);
}
// console.log(factorial(5)); // 120
// console.log(typeof(factorial)); // function

//---------------------------------------------------------------------------------------------------------//



// Hàm là công dân hạng nhất trong JS
// Hàm này chưa có tên nên gọi là hàm ẩn danh   
let firstClassFunction = function(x){
    return x + 1;
}
// truyển hàm vào hàm khác
// hàm có thể trả về hàm khác
function myFunction(myFunc){
    console.log(myFunc.toString()); // in ra nội dung của hàm
    let retVal = myFunc(5);
    console.log("retVal:", retVal);
}
// myFunction(firstClassFunction);

//-----------------------------------------------------------------------------------------------------------//

function objectExample(){
    let obj = {
        "name": "Viet",
        age: 21,
        greet: function(){
            // funtion này được đặt tên là greet luôn chứ không phải là hàm ẩn danh
            console.log("Hello, my name is " + this.name);
        },
        "a b": 1
    };
    console.log(obj); // { name: 'Viet', age: 21, greet: [Function: greet], 'a b': 1 }
    obj.greet(); // Hello, my name is John
    obj.age = 22;
    console.log(obj.age); // 22
    console.log(obj.name); // Viet
    console.log(obj["a b"]); // 1
    obj.email = "viet@123";
    console.log(Object.keys(obj)); // ["name", "age", "greet", "a b", "email"]
    delete obj.email;
    console.log(obj.email); // undefined
}

// objectExample();

//-----------------------------------------------------------------------------------------------------------//

function arrayExample(){
    // mảng có thể chứa nhiều kiểu dữ liệu khác nhau
    // mảng có thể chứa các mảng khác
    // mảng truy cập theo thứ tự object thì không có thứ tự
    let arr = [1, 2, 3, 4, 5];
    console.log(typeof(arr)); // object
    console.log(arr[0]); // 1
    console.log(arr.length); // 5
    arr.push(6);
    console.log(arr); // [1, 2, 3, 4, 5, 6]
    arr.pop();
    console.log(arr); // [1, 2, 3, 4, 5]
    arr.shift();
    console.log(arr); // [2, 3, 4, 5]
    arr.unshift(1);
    console.log(arr); // [1, 2, 3, 4, 5]
    arr.des = 'abc';
    console.log(arr); // [1, 2, 3, 4, 5, des: 'abc' ]
    arr.arr = [1, 2, 3];
    console.log(arr); // [1, 2, 3, 4, 5, des: 'abc', arr: [1, 2, 3] ]
    arr.func = function thisIsArrayFunction(){
        console.log("Hello");
    }
    console.log(arr); // [1, 2, 3, 4, 5, des: 'abc', arr: [1, 2, 3], func: f ]
    console.log(arr.func()); // Hello và undefined, hàm không có return trả về undefined
    arr.length = 3;
    console.log(arr); // [ 1, 2, 3, des: 'abc', arr: [ 1, 2, 3 ], func: [Function (anonymous)] ]
    arr.length = 0;
    console.log(arr); // [ des: 'abc', arr: [ 1, 2, 3 ], func: [Function (anonymous)] ]
    arr.length = 5;
    console.log(arr); // [ <5 empty items>, des: 'abc', arr: [ 1, 2, 3 ], func: [Function (anonymous)] ]
}

// arrayExample();
//-----------------------------------------------------------------------------------------------------------//



// Thao tác với đối tượng Date
function dateExamples() {
  let date = new Date(); // Tạo đối tượng Date hiện tại [cite: 39]
  console.log("Đối tượng Date hiện tại:", date);
  console.log("typeof date:", typeof date); // 'object' [cite: 39]

  // Các phương thức của Date [cite: 41]
  console.log("date.valueOf():", date.valueOf()); // Số mili giây từ 1/1/1970 UTC [cite: 41]
  console.log("date.toISOString():", date.toISOString()); // 'YYYY-MM-DDTHH:mm:ss.sssZ' [cite: 41]
  console.log("date.toLocaleString():", date.toLocaleString()); // Định dạng theo local [cite: 41]
  console.log("date.getFullYear():", date.getFullYear());
}
// dateExamples();
//-----------------------------------------------------------------------------------------------------------//

// try catch giúp ứng dụng không bị break
function exceptionTryCatch() {
  try {
    console.log("Thử gọi hàm không tồn tại...");
    nonExistentFunction(); // Hàm này không được định nghĩa 
    console.log("Dòng này sẽ không được thực thi.");
  } catch (err) { // err là một object 
    console.error("Đã bắt được lỗi!");
    console.error("err.name:", err.name); // Ví dụ: 'ReferenceError' 
    console.error("err.message:", err.message); // Ví dụ: 'nonExistentFunction is not defined'
    // console.error("err.stack:", err.stack);
  }
  console.log("Chương trình tiếp tục sau try...catch.");
}

// exceptionTryCatch();
//-----------------------------------------------------------------------------------------------------------//

// Ném và bắt lỗi với throw, sử dụng finally
function exceptionThrowFinally() {
  try {
    console.log("Chuẩn bị ném lỗi...");
    throw "Đây là một chuỗi lỗi!"; // Ném một chuỗi (thường nên ném Error object) [cite: 51]
    // throw new Error("Đây là một Error object!");
  } catch (errInfo) { // errInfo sẽ là "Đây là một chuỗi lỗi!" [cite: 52]
    console.error("Đã bắt được lỗi được ném ra:", errInfo); // [cite: 52]
    // Nếu ném Error object: console.error("Thông điệp lỗi:", errInfo.message);
  } finally {
    console.log("Khối finally: Luôn được thực thi."); // Khối này được thực thi sau try/catch [cite: 52]
  }
  console.log("Chương trình tiếp tục sau throw/finally.");
}
// exceptionThrowFinally();
//-----------------------------------------------------------------------------------------------------------//

function myFuncNewStyleDefaults(a = 1, b = "Hello") { // [cite: 60]
  console.log(`Mới: a=${a}, b=${b}`);
}

// myFuncNewStyleDefaults();
// myFuncNewStyleDefaults(5, "Hi");
// myFuncNewStyleDefaults(0, "");

//------------------------------------------------------------------------------------------------------------//

function myFuncNewRest(a, b, ...theArgsArray) { // theArgsArray là một mảng 
  var c = theArgsArray[0]; 
  console.log(`Mới (rest): a=${a}, b=${b}, c=${c}, theArgsArray=`, theArgsArray);
}

// myFuncNewRest(10, 20, 30, 40); //a=10, b=20, c=30, theArgsArray= [ 30, 40 ]
// myFuncNewRest(10, 20);// a=10, b=20, c=undefined, theArgsArray= []

//------------------------------------------------------------------------------------------------------------//

// Sử dụng toán tử Spread ...
function spreadOperatorExamples() {
  var anArray = [1, 2, 3];

  // Gọi hàm với các phần tử mảng làm đối số
  function sumThree(x, y, z) {
    return x + y + z;
  }
  let resultSum = sumThree(...anArray); // Mở rộng mảng thành các đối số
  console.log("sumThree(...anArray):", resultSum); // 6

  // Chèn mảng vào mảng khác
  var combinedArray = [5, ...anArray, 6]; 
  console.log("[5, ...anArray, 6]:", combinedArray); //[ 5, 1, 2, 3, 6 ]

  // Mở rộng chuỗi (iterable) 
  let str = "Hi";
  let chars = [...str];
  console.log("[...\"Hi\"]:", chars); // ['H', 'i']
}

// spreadOperatorExamples();

//------------------------------------------------------------------------------------------------------------//

// Sử dụng Destructuring
function destructuringExamples() {
  // Với mảng
  let arr = [10, 20, 30];
  let [a, b, c] = arr; 
  console.log(`Từ mảng: a=${a}, b=${b}, c=${c}`); //a=10, b=20, c=30

  // Với object
  let obj = { name: "Alice", age: 28, salary: 50000 };
  let { name, age, salary: Lương } = obj; 
  console.log(`Từ object: name=${name}, age=${age}, Lương=${Lương}`);//name=Alice, age=28, Lương=50000

  // Trong tham số hàm
  function renderUserNew({ name, age }) { 
    console.log(`Render (mới): ${name}, ${age} tuổi`); // Charlie, 42 tuổi
  }
  renderUserNew({ name: "Charlie", age: 42 });
}

// destructuringExamples();

//------------------------------------------------------------------------------------------------------------//

// Sử dụng Template String Literals - chuỗi mẫu
function templateLiteralsExample(name, age) {
  let strNew = `Chào ${name}, bạn ${age} tuổi.`; 
  console.log("Chuỗi (mới):", strNew);

  let multiLineStr = `Đây là một chuỗi
có nhiều dòng.
Giá trị tính toán: ${10 + 5}`; 
  console.log("Chuỗi đa dòng (mới):\n", multiLineStr);
}

// templateLiteralsExample("David", 25);

//------------------------------------------------------------------------------------------------------------//

// Sử dụng vòng lặp for...of
function forOfLoopExample() {
  let a = [5, 6, 7];

  let sumNew = 0;
  for (let ent of a) { sumNew += ent; } 
  console.log("Tổng (mới - for...of array):", sumNew);

  let str = "abc";
  let charsConcatenated = "";
  for (let char of str) { 
    charsConcatenated += char + "-";
  }
  charsConcatenated = charsConcatenated.slice(0, -1); // Xóa ký tự '-' cuối cùng
  console.log("Nối ký tự (mới - for...of string):", charsConcatenated);
}

// forOfLoopExample();
//------------------------------------------------------------------------------------------------------------//