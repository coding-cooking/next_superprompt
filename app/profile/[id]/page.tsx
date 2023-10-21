"use client"

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Profile from "@/components/Profile";

type UserProfileProps = {
    params: {
        username: string;
        email: string;
        image: string;
        id: string;
    }
}
const UserProfile = ({ params }: UserProfileProps) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setPosts(data);
    }

    useEffect(() => {
        if (params?.id) fetchPosts();
    }, [params.id])

    return (
        <Profile
            name={userName ?? "Haha"}
            desc={`Welcome to ${userName ?? "Haha"}'s personalized profile page`}
            data={posts}
        />
    )

}

export default UserProfile