var b = '';

function a(data) {
   setTimeout(function () {
     b = arguments[1];
      console.log("var: ", data);
   }, 500, '0 param','1 param');
}

a("param of func a");

function c() {
  setTimeout(function () {
    console.log("b: ", b);
  }, 600);
}
c();
