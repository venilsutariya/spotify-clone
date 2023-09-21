"use client";

import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AccountContent = () => {
    const router = useRouter();
    const {isLoading , user , subscription} = useUser();

    const [loading , setLoading] = useState(false);

    useEffect(() => {
        if(!isLoading && !user){
            router.replace('/')
        }
    }, [isLoading , user , router])
    return (
        <>
            <h1 className="flex justify-center my-5">Currently you are on the no subscription</h1>
            <h1 className="flex justify-center my-5">You can Go to Home</h1>
        </>
    )
}

export default AccountContent;