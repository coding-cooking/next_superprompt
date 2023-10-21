"use client"
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/Form";


export const POST_TEMPLATE = {
    creator: {
        username: '',
        email: '',
        image: '',
        _id: ''
    },
    prompt: "",
    tag: ''
}


const CreatePrompt = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState(POST_TEMPLATE);

    const createPrompt = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        console.log('canshu', post, session)
        try {
            const response = await fetch("/api/prompt/new", {
                method: "post",
                body: JSON.stringify({
                    userId: session?.user.id,
                    prompt: post.prompt,
                    tag: post.tag
                })
            })

            if (response.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(111, error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Create"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={createPrompt}
        />
    )
}

export default CreatePrompt
