// transforms an 8-but byte array into an int64
function fromBytesInt64(bytes) {
  const { buffer } = new Uint8Array(bytes);

  const dataview = new DataView(buffer);

  val = dataview.getBigInt64(0);

  return val;
}

//transform number into 8 unsigned bytes:
function toBytesInt64(num) {
  arr = new ArrayBuffer(8); // an Int64 takes 8 bytes

  view = new DataView(arr);

  view.setBigInt64(0, num, false); // byteOffset = 0; litteEndian = false

  arr = new Uint8Array(arr);

  return arr;
}

//Put "0" (Decimal) or "00" (Hex) in all the input fields
function clear(format) {
  var str = "0";
  if (format == "hex") {
    str = "00";
  }
  $("input").val(str);
}

//When ready, set click functions
$(document).ready(function () {
  //on load should already be filled with 0s
  clear();
  //clear on click
  $("#clear").click(function () {
    format = $("#byteFormat").val();
    clear(format);
  });
  //convert bytes to int
  $("#convertToInt").click(function () {
    //get the radix
    format = $("#byteFormat").val();
    var radix = 10;
    if (format == "hex") {
      radix = 16;
    }
    //put all byte values in an array
    var bytes = [];
    for (i = 1; i < 9; i++) {
      bytes.push(parseInt($("#byte" + i).val(), radix));
    }
    //convert to int
    let decimalValue = fromBytesInt64(bytes);
    //update UI
    $("#result").val(decimalValue);
  });
  //convert int to bytes
  $("#convertToArray").click(function () {
    //get the radix
    format = $("#byteFormat").val();
    var radix = 10;
    if (format == "hex") {
      radix = 16;
    }
    //get the int
    intValue = $("#result").val();
    //convert to bytes
    let bytes = toBytesInt64(intValue);

    //update UI
    for (i = 1; i < 9; i++) {
      $("#byte" + i).val(bytes[i - 1].toString(radix));
    }
  });
});
