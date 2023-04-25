import {Friendship} from "wechaty";
import * as PUPPET from "wechaty-puppet";

async function onFriendship(friendship: Friendship) {
  if (friendship.type() === PUPPET.types.Friendship.Receive) {
    await friendship.accept();
  }
}

export {
  onFriendship
}
