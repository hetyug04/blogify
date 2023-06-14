import mongoose from "mongoose";

var date = new Date();
var dd = String(date.getDate()).padStart(2, "0");
var mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
var yyyy = date.getFullYear();

date = mm + "/" + dd + "/" + yyyy;

var time = new Date();
const showTime = time.getHours() + ":" + time.getMinutes();

const PostSchema = new mongoose.Schema({
  author: {
    type: String,
    trim: true,
  },
  title: {
    type: String,
    required: (true, "Please Provide A Title For Your Post"),
    minLength: 4,
    maxLength: 30,
  },
  body: {
    type: mongoose.Schema.Types.Mixed,
    required: (true, "Please Provide A Body For Your Post"),
    minLength: 5,
    maxLength: 7000,
  },
  userId: {
    type: String,
    required: (true, "Please provide an ID for your post"),
  },
  timePosted: {
    type: String,
  },
  tags: [{ id: String, text: String }],
});

PostSchema.pre("save", async function () {
  // (this.modifiedPaths())
  this.timePosted = `${showTime} ${date}`;
});

export default mongoose.model("Post", PostSchema);
