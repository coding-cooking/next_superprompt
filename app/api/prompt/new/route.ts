import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
	const { userId, prompt, tag } = await req.json();
	if (userId && prompt && tag) {
		try {
			await connectToDB();
			const newPrompt = new Prompt({
				creator: userId,
				prompt,
				tag,
			});
			await newPrompt.save();

			return new Response(JSON.stringify(newPrompt), {
				status: 201,
			});
		} catch (error) {
			return new Response("Failed to create a new prompt", { status: 500 });
		}
	} else {
		return new Response('', {
			status: 400,
		});
	}
};
