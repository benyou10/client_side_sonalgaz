import executequery from "@/components/mysqlconnection";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { pages } from "next/dist/build/templates/app-page";

export const  authOptions = {
pages:{
  signIn: '/',
}
  ,
  session: {
    
    strategy: 'jwt',
    maxAge: 2 * 24 * 60 * 60,
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "username", placeholder: "Enter your email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        // Add your authorization logic here
        const { email, password } = credentials;
        // Example: Check if email and password are valid
        const query=`select * from employees where first_name="${email}" and matricule=${password}`
        const user=await executequery(query,[])
        
        if (user) {
          console.log(user)
          // Return user object if credentials are valid
         // Assuming user is an array and we take the first result
          return { id:0,name:user.first_name,email:user.last_name,image:user.role_id };
          

        } else {
          // Return null if credentials are invalid
          return null;
        }
      }
    }),
    // Add other providers if needed, such as Email provider
    // Email({
    //   server: {
    //     host: 'smtp.example.com',
    //     port: 587,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASSWORD
    //     }
    //   },
    //   from: process.env.EMAIL_FROM
    // })
  ],callbacks: {

   
    session: ({session, token,user} ) => {
    

      return session;
    }
  }
  
};

const handler = NextAuth(authOptions);



export { handler as GET, handler as POST }