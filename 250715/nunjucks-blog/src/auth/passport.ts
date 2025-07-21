import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import type { Profile as PassportProfile } from "passport";
import { getUserById, createUser } from "../models/userModel";
import type { User } from "../types/User";

export function configurePassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: process.env.PASSPORT_CALLBACK_URL!,
      },
      async (
        _accessToken: string,
        _refreshToken: string,
        profile: PassportProfile,
        done: (error: any, user?: Express.User | false | null) => void,
      ) => {
        const user: User = {
          id: profile.id,
          username: profile.username ?? "",
          displayName: profile.displayName ?? "",
          profileUrl: (profile as any).profileUrl ?? "",
          date: new Date(Date.now()).toLocaleDateString(),
          isAdmin: 0,
        };

        try {
          const existing = await getUserById(user.id);
          if (!existing) await createUser(user);
          done(null, user);
        } catch (err) {
          done(err);
        }
      },
    ),
  );

  passport.serializeUser((user: any, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    // console.log("Deserializing user with ID:", id);
    try {
      const user = await getUserById(id);
      // console.log("Found user:", user);
      done(null, user);
    } catch (err) {
      // console.error("Deserialization error:", err);
      done(err);
    }
  });
}
