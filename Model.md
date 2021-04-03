### User Model

```
User: {
   id: string
   username: String,
   email: String,
   status: String,
   password: String,
   resetPasswordToken: string,
   resetPasswordTokenExpire Date,
   createdAt: Date/time,
   updatedAt: Date/time,
}
```

#### Channel Model

```
channel: {
   id: String,
   name: String,
   userId: objectId,
   identifier: Number,
   visibility: String,
   description: String,
   members: [{userId: objectId}]
   createdAt: Date/time,
   updatedAt: Date/time
}
```

#### Message model

```
message: {
   id: ObjectId, - id for each individual message.
   userId: ObjectId, - id for the user who send the message.
   text: String, - the message it self.
   createdAt: Date/time, - the time the message is sent.
   updateAt: Date/time - the time the message is updated.
}

```

### Member

```
member: {
   userId: ObjectId,
   ChannelId: ObjectId,
   createdAt: Date/time,
   updatedAt: Date/time
}
```

### Credentials

```
credentials: {
   id: String,
   bio: String,
   website: String,
   userId: ObjectId,
   profilePic: String
}
```

```
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

### Reply

```
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
```

### Open Source Project

```
Open-source-Project: {
   userId: objectId,
   projectName: String
}
```
