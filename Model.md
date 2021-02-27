```
User: {
   bio: String,
   email: String,
   createdAt: Date,
   status: String,
   password: String,
   username: String,
   profilePic: String,
}

Credentials: {
   fname: String,
   lname: String,
   profilePic: String,
}

Posts: {
   body: String,
   like: Number,
   unLike: Number,
   createAt: Date,
   userId: objectId,
   comments: [{

   }]
}

channels: {
   name: String,
   messages: [
      {
         userId: objectId,
         message: String
      }
   ],
   userId: objectId,
   visibility: String,
   description: String,
   members: [{userId: objectId}]
}

Reply: {
   postId: objectId,
   user: {
      profilePic: String,
      userHandle: String
   },
   body: String,
   createAt: Date,
   like: Number,
   unLike: Number,
}

Notifications: {

}

Open-source-Project: {
   userId: objectId,
}
```
