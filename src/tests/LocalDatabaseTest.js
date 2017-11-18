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

const getFriendInfoTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', () => {
    localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '1111111111111111111', () => {
      localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '1111111111111111111',
      (friendInfo) => {
        if (friendInfo.id !== '1111111111111111111') {
          throw new Error('error to get friend information');
        }
      });
    });
  });
};

const removeFriendTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', () => {
    localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '1111111111111111111', () => {
      localDb.removeFriend('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', () => {
        localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000',
        (friendInfo) => {
          if (friendInfo != null) {
            throw new Error('error to get friend information');
          }
        });
      });
    });
  });
};

const addFriendMessageTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', () => {
    localDb.addFriendMessage('qqqqqqqqqqqqqqqqqqq', '0000000000000000000',
    { message: 'Hi!', date: 'today' }, (success) => {
      if (success === false) {
        throw new Error('error to add message');
      }
      localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', (friendInfo) => {
        if (friendInfo.messages.length !== 1 || friendInfo.messages[0].message !== 'Hi!') {
          throw new Error('error to get friend info');
        }
        localDb.addFriendMessage('qqqqqqqqqqqqqqqqqqq', '0000000000000000000',
        { message: 'Bye!', date: 'today' }, (success2) => {
          if (success2 === false) {
            throw new Error('error to add message');
          }
          localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', (friendInfo2) => {
            if (friendInfo2.messages.length !== 2) {
              throw new Error('error to get friend info');
            }
          });
        });
      });
    });
  });
};

const updateFriendInfoTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.addFriend('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', () => {
    localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', (friend) => {
      const newFriendInfo = friend;
      newFriendInfo.name = 'joseph';
      newFriendInfo.photourl = 'http://photo.com';
      localDb.updateFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000',
      newFriendInfo, (success) => {
        if (success === false) {
          throw new Error('error to update friend info');
        }
        localDb.addFriendMessage('qqqqqqqqqqqqqqqqqqq', '0000000000000000000',
        { message: 'Hey!' }, (success2) => {
          if (success2 === false) {
            throw new Error('error to add friend message');
          }
          localDb.getFriendInfo('qqqqqqqqqqqqqqqqqqq', '0000000000000000000', (friend2) => {
            if (friend2 == null || friend2.name !== 'joseph'
            || friend2.photourl !== 'http://photo.com') {
              throw new Error('error to get friend info');
            }
          });
        });
      });
    });
  });
};

const getUserInfoTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.getUserInfo('qqqqqqqqqqqqqqqqqqq', (user) => {
    if (user != null && user !== undefined) {
      throw new Error('error to get usar info');
    }
    localDb.addUser('pppppppppppppppppppp', () => {
      localDb.addUser('qqqqqqqqqqqqqqqqqqq', () => {
        localDb.getUserInfo('qqqqqqqqqqqqqqqqqqq', (user2) => {
          if (user2 == null || user2 === undefined || user2.uid !== 'qqqqqqqqqqqqqqqqqqq') {
            throw new Error('error to get user info');
          }
        });
      });
    });
  });
};

const updateUserInfoTest = () => {
  const localDb = new LocalDatabase(true);

  localDb.updateUserInfo('qqqqqqqqqqqqqqqqqqq',
  { uid: 'qqqqqqqqqqqqqqqqqqq', name: 'aaaaaaaaaaaaaaa' }, (success) => {
    if (success === true) {
      throw new Error('error in update user info');
    }

    localDb.addUser('qqqqqqqqqqqqqqqqqqq', () => {
      localDb.addUser('pppppppppppppppppppp', () => {
        localDb.updateUserInfo('qqqqqqqqqqqqqqqqqqq',
        { uid: 'qqqqqqqqqqqqqqqqqqq', name: 'aaaaaaaaaaaaaaa' }, (success2) => {
          if (success2 === false) {
            throw new Error('error to update user info');
          }
          localDb.getUserInfo('qqqqqqqqqqqqqqqqqqq', (user) => {
            if (user == null || user === undefined || user.name !== 'aaaaaaaaaaaaaaa') {
              throw new Error('error to get usar info');
            }
          });
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
    getFriendInfoTest();
    removeFriendTest();
    addFriendMessageTest();
    updateFriendInfoTest();
    getUserInfoTest();
    updateUserInfoTest();
  }
}

export default LocalDatabaseTest;
