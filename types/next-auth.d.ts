import "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            id: string;
            email?: any;
            image?: any;
            username?: any;
        }
    }
    interface Profile {
        picture: string;
    }

}