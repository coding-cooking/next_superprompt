"use client"
import { useState, useEffect, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/Form";
import { PostProps } from "@/components/Feed";
import { POST_TEMPLATE } from "../create-prompt/page";


const EditPrompt = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const promptId = searchParams.get("id");
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState<PostProps>(POST_TEMPLATE);

    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptId}`)
            const data = await response.json();
            setPost(data)
        }

        if (promptId) getPromptDetails();

    }, [promptId])

    const updatePrompt = async (e: FormEvent) => {
        e.preventDefault();
        setSubmitting(true);

        if (!promptId) return alert("Prompt ID not found")

        try {
            const responce = await fetch(`/api/prompt/${promptId}`, {
                method: "PATCH",
                body: JSON.stringify({
                    prompt: post?.prompt,
                    tag: post?.tag,
                    creator: post?.creator,
                    _id: post?._id,
                })
            })

            if (responce.ok) {
                router.push("/");
            }
        } catch (error) {
            console.log(error);
        } finally {
            setSubmitting(false);
        }
    }
    return (
        <Form
            type="Edit"
            post={post}
            setPost={setPost}
            submitting={submitting}
            handleSubmit={updatePrompt}
        />
    )
}

export default EditPrompt
