```
User: {
   username: String,
   email: String,
   password: String,
   createAt: Date
}

Credentials: {
   fname: String,
   lname: String,
   profilePic: String,
}

Posts: {
   userId: objectId,
   body: String,
   createAt: Date,
}

Reply: {
   postId: objectId,
   userId: objectId,
   body: String,
   createAt: Date,
   like: Number,
   unLike: Number
}

Notifications: {

}

Open-source-Project: {
   userId: objectId,
}
```
