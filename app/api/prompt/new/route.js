import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
	console.log("我收到请求了", req);
	const { userId, prompt, tag } = await req.json();
	console.log("这里这里这里", userId, prompt, tag);

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
};
