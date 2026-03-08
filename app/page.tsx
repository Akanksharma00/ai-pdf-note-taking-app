'use client'

import { api } from "@/convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useCallback, useEffect } from "react";

export default function Home() {
  const {user} = useUser();
  const createUser = useMutation(api.users.createUser)

  console.log("User :::: ", user)

 

  const checkUser = useCallback(async () => {
    const result = await createUser({
      email: user?.primaryEmailAddress?.emailAddress || '',
      userName: user?.fullName || '',
      imageUrl: user?.imageUrl || ''
    });

    console.log("Create User Result :::: ", result);
  }, [createUser, user]);

   useEffect(()=>{
    if(user) checkUser();
  },[checkUser, user]);

  return (
    <>
    <div>Hello world!</div>
    <UserButton />
    </>
  );
}
