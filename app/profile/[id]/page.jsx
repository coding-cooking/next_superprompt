"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@components/Profile";

const UserProfile = ({params}) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        console.log(8888, data)
        setPosts(data);
    }

    useEffect(() => {
        if (params?.id) fetchPosts();
    }, [params.id])

    return (
        <Profile
            name={userName}
            desc={ `Welcome to ${userName}'s personalized profile page` }
            data={ posts }
        />
    )

}

export default UserProfile