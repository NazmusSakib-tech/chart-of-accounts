const monsoose = require("mongoose");

monsoose.connect("mongodb://localhost:27017/Accounts").then(() => {
    console.log("connection is successfull");
}).catch((e) => {
    console.log("No connect")

})


// function sakibVai() {
//     monsoose.connect("mongodb://localhost:27017/student-api").then(() => {
//         console.log("connection is successfull");
//     }).catch((e) => {
//         console.log("No connect")
//     })

// }

// sakibVai();