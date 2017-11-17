import DataStore from 'react-native-local-mongodb';

const dbName = { filename: 'AppStorage' };
const tempStorage = true;

/* PRIVATE FUNCTIONS */

const arraysEqual = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
      return false;
    }

    for (let i = arr1.length; i--;) {
      if (arr1[i] !== arr2[i]) {
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

/* END OF PRIVATE FUNCTIONS */

/*
* Manage local database
*/
class LocalDatabase {
  constructor() {
    if (tempStorage) {
      this.db = new DataStore();
    } else {
      this.db = new DataStore(dbName);
      this.db.loadDatabase();
    }
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
      if ((currentList && arraysEqual(currentList, newFriendList) === false)
            || currentList == null || currentList === undefined) {
        checkNullUid(this.db, uid_, () => {
          this.db.update({ uid: uid_ }, { $set: { friends: newFriendList } },
            {}, () => {
              callback();
            });
        });
      } else {
        callback();
      }
    });
  }

}

export default LocalDatabase;
