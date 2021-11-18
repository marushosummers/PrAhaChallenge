import TwitterApi from "twitter-api-v2";
import { Command } from 'commander';
import { User } from "./User";

const commander = new Command();
const token = process.env.APP_USER_TOKEN ?? "";
const twitterClient = new TwitterApi(token);
const client = twitterClient.readOnly;

const fetchFollowerById = async (UserId: string): Promise<User[]> => {
  const count = 100;
  const res = await client.v1.get('followers/list.json', { user_id: UserId, count: count });
  const users = await res.users.map((user: any) => new User({
    id: user.id,
    name: user.name,
    image: user.profile_image_url_https,
    protected: user.protected
  }));
  return users
};

const run = async (UserId: string): Promise<void> => {
  const followers = await fetchFollowerById(UserId);
  console.log(followers)
};

commander.option("-i, --id <string>", "twitter user id").parse(process.argv)
const options = commander.opts();

if (!options.id) {
  console.log("id is required")
  process.exit(1)
} else {
  const userId = options.id;
  run(userId);
}
