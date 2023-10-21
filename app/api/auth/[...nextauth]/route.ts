import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User, { UserType } from "@/models/user";
import { connectToDB } from "@/utils/database";
import { DefaultSession } from "next-auth";

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		//modify the user's session object before it is stored in the browser
		async session({ session }) {
			const sessionUser: UserType | null = await User.findOne({ email: session.user.email });
			// store the user id from MongoDB to session
			if (sessionUser) {
				session.user.id = sessionUser._id.toString();
			}
			
			return session;
		},

		
		async signIn({ account, profile, user, credentials }) {
			if(profile){
				try {
					await connectToDB();

					// check if user already exists
					const userExists = await User.findOne({ email: profile.email });

					// if not, create a new document and save user in MongoDB
					if (!userExists) {
						return await User.create({
							email: profile.email,
							username: profile.name?.replace(" ", "").toLowerCase(),
							image: profile.picture,
						});
					}
					return true;
				} catch (error: any) {
					console.log("Error checking if user exists: ", error.message);
					return false;
				}

			}
			
		},
	},
});

export { handler as GET, handler as POST };
