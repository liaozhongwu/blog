use blog
db.createUser({user: "lzw", pwd: "lzw123", roles: [{role: "dbOwner", db: "blog"}]})