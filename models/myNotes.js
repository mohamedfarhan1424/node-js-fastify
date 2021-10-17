const mongoose = require("mongoose");
const { Schema } = mongoose;

const employees = new Schema(
    {
        employeename: {
          type: String,
        },
        employeeemail: {
          type: String,
        },
        employeerole: {
          type: String,
        }
      },
)
const companies=new Schema({
        name: {
          type: String,
        },
        employees: [
          employees
        ],
      },
)
const mynotesSchema = new Schema({
  user: {
    email: {
      type: String,
    },
    companies: [
      companies
    ],
  },
});

// const Person = mongoose.model("Notes",mynotesSchema );

// Person.find({ 'user.email': 'mohamedfarhan1424@gmail.com' }, function (err, person) {
//   if (err) {console.log(err); return};
//   console.log(person);
// });
module.exports = mongoose.model("Notes", mynotesSchema);