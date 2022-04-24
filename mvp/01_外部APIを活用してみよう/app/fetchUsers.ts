import TwitterApi from "twitter-api-v2";
import { Command } from 'commander';
import { User } from "./User";

const commander = new Command();
const token = process.env.APP_USER_TOKEN ?? "";
const twitterClient = new TwitterApi(token);
const client = twitterClient.readOnly;

const fetchUsersByTweetWord = async (word: string): Promise<User[]> => {
  const count = 100;
  const res = await client.v1.get('search/tweets.json', { q: word, count: count });
  const users = await res.statuses.map((tweet: any) => new User({
    id: tweet.user.id,
    name: tweet.user.name,
    image: tweet.user.profile_image_url_https,
    protected: tweet.user.protected
  }));
  return users
};

const run = async (word: string): Promise<void> => {
  const users = await fetchUsersByTweetWord(word);
  console.log(users)
};

commander.option("-w, --word <string>", "twitter user id").parse(process.argv)
const options = commander.opts();

if (!options.word) {
  console.log("word is required")
  process.exit(1)
} else {
  const word = options.word;
  run(word);
}
