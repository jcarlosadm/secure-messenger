import DataStore from 'react-native-local-mongodb';

const dbConfig = { filename: 'AppStorage' };

/* PRIVATE FUNCTIONS */

const arraysEqual = (currentList, ids) => {
    if (currentList.length !== ids.length) {
      return false;
    }

    for (let i = 0; i < currentList.length; ++i) {
      if (currentList[i].id !== ids[i]) {
        return false;
      }
    }

    return true;
};

/*
* check if database contains uidCheck id. If not, insert its
* db: local database
* uidCheck: user id
* callback: callback function without parameters
*/
const checkNullUid = (db, uidCheck, callback) => {
  db.find({ uid: uidCheck }, (err, docs) => {
    if (docs == null || docs === undefined || docs.length === 0) {
      db.insert({ uid: uidCheck }, () => {
        callback();
      });
    } else {
      callback();
    }
  });
};

/*
* check if friend id exists in database
* db: local database
* uid_: user id
* friendId: id of user to search
* callback: callback function with one parameter
*/
const friendExists = (db, uid_, friendId, callback) => {
  db.find({ uid: uid_, friends: { $elemMatch: { id: friendId } } },
    (err, doc) => {
    if (doc == null || doc === undefined || doc.length === 0) {
      callback(null);
    } else {
      const friendList = doc[0].friends;
      let friendInfo = null;

      for (let i = 0; i < friendList.length; ++i) {
        if (friendList[i].id === friendId) {
          friendInfo = friendList[i];
          break;
        }
      }

      callback(friendInfo);
    }
  });
};

/* END OF PRIVATE FUNCTIONS */

/*
* Manage local database
*/
class LocalDatabase {
  constructor(tempStorage) {
    if (tempStorage) {
      this.db = new DataStore();
    } else {
      this.db = new DataStore(dbConfig);
      this.db.loadDatabase();
    }
  }

  /*
  * clear database
  * callback: callback function without parameters
  */
  clear(callback) {
    this.db.remove({}, () => {
      callback();
    });
  }

  /*
  * get array of friends ids
  * uid_: id of user
  * callback: callback function with one parameter: array of friends ids
  */
  getFriendList(uid_, callback) {
    this.db.find({ uid: uid_ }, (err, docs) => {
      if (docs && docs.length > 0) {
        const friendList = docs[0].friends;
        callback(friendList);
      } else {
        callback(null);
      }
    });
  }

  /*
  * check if the newFriendList are equals to currentList. If not equals,
  *   set currentList to newFriendList
  * uid_: id of user
  * newFriendList: new array of friends ids
  * callback: callback function without parameters
  */
  updateFriendList(uid_, newFriendList, callback) {
    this.getFriendList(uid_, (currentList) => {
      if ((currentList
          && arraysEqual(currentList, newFriendList) === false)
          || currentList == null || currentList === undefined) {
        checkNullUid(this.db, uid_, () => {
          const list = [];
          for (let i = 0; i < newFriendList.length; ++i) {
            list.push({ id: newFriendList[i] });
          }

          this.db.update({ uid: uid_ }, { $set: { friends: list } },
            {}, () => {
              callback();
            });
        });
      } else {
        callback();
      }
    });
  }

  /*
  * check if user id exists. if not, add this
  * uid_: user id
  * callback: callback function without parameters
  */
  addUser(uid_, callback) {
    checkNullUid(this.db, uid_, () => {
      callback();
    });
  }

  /*
  * add friend to friend list of user
  * uid_: user id
  * friendId: friend id
  * callback: callback function without parameters
  */
  addFriend(uid_, friendId, callback) {
    checkNullUid(this.db, uid_, () => {
      friendExists(this.db, uid_, friendId, (friendInfo) => {
        if (friendInfo == null) {
          const friendObj = { id: friendId };

          this.db.update({ uid: uid_ },
            { $push: { friends: friendObj } }, {}, () => {
              callback();
            });
        } else {
          callback();
        }
      });
    });
  }

  /*
  * get friend information
  * uid_: user id
  * friendId: friend id
  * callback: callback function with one parameter
  */
  getFriendInfo(uid_, friendId, callback) {
    friendExists(this.db, uid_, friendId, (friendInfo) => {
      callback(friendInfo);
    });
  }

  /*
  * remove friend
  * uid_: user id
  * friendId: friend id
  * callback: callback function without parameters
  */
  removeFriend(uid_, friendId, callback) {
    friendExists(this.db, uid_, friendId, (friendInfo) => {
      if (friendInfo) {
        this.db.update({ uid: uid_ },
        { $pull: { friends: { id: friendId } } }, {}, () => {
          callback();
        });
      } else {
        callback();
      }
    });
  }

  addFriendMessage(uid_, friendId, messageObj, callback) {
    friendExists(this.db, uid_, friendId, (friendInfo) => {
      if (friendInfo) {
        const newFriendInfo = friendInfo;
        if (newFriendInfo.messages === undefined || newFriendInfo.messages == null) {
          newFriendInfo.messages = [];
        }

        newFriendInfo.messages.push(messageObj);

        this.removeFriend(uid_, friendId, () => {
          this.db.update({ uid: uid_ },
            { $push: { friends: newFriendInfo } }, {}, () => {
              callback(true);
            });
        });
      } else {
        callback(false);
      }
    });
  }

  updateFriendInfo(uid_, friendId, friendObj, callback) {
    friendExists(this.db, uid_, friendId, (friendInfo) => {
      if (friendInfo) {
        this.removeFriend(uid_, friendId, () => {
          this.db.update({ uid: uid_ },
            { $push: { friends: friendObj } }, {}, () => {
              callback(true);
            });
        });
      } else {
        callback(false);
      }
    });
  }

  updateUserInfo(uid_, userObj, callback) {
    this.db.find({ uid: uid_ }, (err, doc) => {
      if (doc && doc.length > 0) {
        this.db.remove({ uid: uid_ }, () => {
          this.db.insert(userObj, () => {
            callback(true);
          });
        });
      } else {
        callback(false);
      }
    });
  }

  getUserInfo(uid_, callback) {
    this.db.find({ uid: uid_ }, (err, doc) => {
      if (doc && doc.length > 0) {
        callback(doc[0]);
      } else {
        callback(null);
      }
    });
  }

}

export default LocalDatabase;
