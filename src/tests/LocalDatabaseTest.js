import LocalDatabase from '../LocalDatabase';

const updateFriendListTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.updateFriendList('sadsdsesdsdzcxzdsd', ['aaaaa', 'fffffff'], () => {
    localDb.getFriendList('sadsdsesdsdzcxzdsd', (friendList) => {
      if (friendList == null || friendList[0].id !== 'aaaaa'
            || friendList[1].id !== 'fffffff') {
        throw new Error('error to get friendList');
      }
    });
  });
};

const addFriendTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqq', '00000000000000000', () => {
    localDb.addFriend('qqqqqqqqqqqqqqqqq', '00000000000000000', () => {
      localDb.getFriendList('qqqqqqqqqqqqqqqqq', (friendList) => {
        if (friendList == null || friendList[0].id !== '00000000000000000') {
          throw new Error('error to get friendList');
        }
      });
    });
  });
};

const clearTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqq', '00000000000000000', () => {
    localDb.getFriendList('qqqqqqqqqqqqqqqqq', (friendList) => {
      if (friendList == null || friendList[0].id !== '00000000000000000') {
        throw new Error('error to get friend list');
      }

      localDb.clear(() => {
        localDb.getFriendList('qqqqqqqqqqqqqqqqq', (friendList2) => {
          if (friendList2 != null) {
            throw new Error('error to get friend list');
          }
        });
      });
    });
  });
};

class LocalDatabaseTest {
  run() {
    updateFriendListTest();
    addFriendTest();
    clearTest();
  }
}

export default LocalDatabaseTest;

// import DataStore from 'react-native-local-mongodb';


//const db = new DataStore(/*{ filename: 'storageKey' }*/);
//db.loadDatabase();

/*const doc = [
  {
    uid: 'sadsdsesdsdzcxzdsd',
    friends: ['aaaaaa', 'bbbbbb']
  }
];

db.insert(doc);

db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
  console.log(docs[0].friends);
});

db.update({ uid: 'sadsdsesdsdzcxzdsd' }, { $push: { friends: 'ccccccc' } },
{}, () => {});

db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
  console.log(docs[0].friends);
});

db.update({ uid: 'sadsdsesdsdzcxzdsd' }, { $pull: { friends: 'ccccccc' } },
{}, () => {});

db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
  console.log(docs[0].friends);
});

db.update({ uid: 'sadsdsesdsdzcxzdsd' },
{ $set: { friends: ['ddddddd', 'eeeeeeee'] } },
{}, () => {});

db.find({ uid: 'sadsdsesdsdzcxzdsd' }, (err, docs) => {
  console.log(docs[0].friends);
});
*/
