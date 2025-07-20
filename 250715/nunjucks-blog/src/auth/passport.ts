import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import type { Profile as PassportProfile } from "passport";

export function configurePassport() {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID!,
        clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        callbackURL: process.env.PASSPORT_CALLBACK_URL!,
      },
      (
        _accessToken: string,
        _refreshToken: string,
        profile: PassportProfile,
        done: (error: any, user?: Express.User | false | null) => void,
      ) => {
        const user: Express.User = {
          id: profile.id,
          username: profile.username ?? "",
          displayName: profile.displayName ?? "",
          profileUrl: (profile as any).profileUrl,
        };
        done(null, user);
      },
    ),
  );

  passport.serializeUser((user: Express.User, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj: Express.User, done) => {
    done(null, obj);
  });
}
