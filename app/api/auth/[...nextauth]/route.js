// import { db } from "../../../../firebase"
import NextAuth from "next-auth"
// import {FirebaseAdapter} from "@next-auth/firebase-adapter"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    // adapter: FirebaseAdapter(db)
})
export { handler as GET, handler as POST }