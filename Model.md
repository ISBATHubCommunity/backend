### User Model

```
User: {
   id: string
   handle: String,
   email: String,
   bio: String,
   createdAt: Date,
   updatedAt: Date,
   status: String,
   password: String,
   profilePic: String,
   resetPasswordToken: string,
   resetPasswordTokenExpire Date,
}

```

```

credentials: {
   id: String,
   bio: String,
   profilePic: String
}

Post: {
   body: String,
   like: Number,
   unLike: Number,
   createAt: Date,
   userId: objectId,
   comments: [{

   }]
}
```

#### Channel Model

```
channel: {
   id: String,
   name: String,
   userId: objectId,
   identifier: number,
   visibility: String,
   description: String,
   members: [{userId: objectId}]
}

```

#### Message model

```
message: {
   id: ObjectId, - id for each individual message.
   userId: ObjectId, - id for the user who send the message.
   text: String, - the message it self.
   createdAt: Date, - the time the message is sent.
   updateAt: Date, - the time the message is updated.
}

```

member: {
userId: ObjectId,
ChannelId: ObjectId,
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

Open-source-Project: {
userId: objectId,
}

```

```
