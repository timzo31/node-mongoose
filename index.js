const mongoose = require("mongoose");

const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
  console.log("Conneted correctly to the server");

  Dishes.create({
    name: "Vegetarienne",
    description: "test Veggies",
  })
    .then((dish) => {
      console.log(dish);

      return Dishes.findByIdAndUpdate(
        dish._id,
        {
          $set: { description: "Updated test veggies" },
        },
        {
          new: true,
        }
      ).exec();
    })
    .then((dish) => {
      console.log(dish);

      dish.comments.push({
        rating: 5,
        comment: "I'm getting a sinking feeling !",
        author: "Timera",
      });

      return dish.save();
    })
    .then((dish) => {
      console.log(dish);

      return Dishes.deleteOne({});
    })
    .then(() => {
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
    });
});

// connect.then((db) => {
//   console.log("Conneted correctly to the server");

//   let newDish = Dishes({
//     name: "Uthappizza",
//     description: "test",
//   });

//   newDish
//     .save()
//     .then((dish) => {
//       console.log(dish);

//       return Dishes.find({}).exec();
//     })
//     .then((dishes) => {
//       console.log(dishes);

//       return Dishes.remove({}).exec();
//     })
//     .then(() => {
//       return mongoose.connection.close();
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });
