import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";
import { NextRequest } from "next/server";

export const GET = async (_: NextRequest, { params }: { params: { id: string } }) => {
	try {
		await connectToDB();

		const prompts = await Prompt.find({ creator: params.id }).populate("creator");

		return new Response(JSON.stringify(prompts), {
			status: 200,
		});
	} catch (error) {
		return new Response("Failed to fetch all prompts", { status: 500 });
	}
};
