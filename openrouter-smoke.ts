// This file is only a reference showing example usage of the Comerge OpenRouter proxy; do not modify or remove it—use it solely as guidance when writing app code.

const BASE_URL = "https://comerge.ai";
const ENDPOINT = `${BASE_URL}/v1/openrouter/proxy`;

type ProxyRequest = {
	endpoint: "chat.completions" | "responses";
	payload: Record<string, unknown>;
	metadata?: { requestId?: string };
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const callProxy = async (label: string, payload: ProxyRequest["payload"]) => {
	console.log(`\n=== ${label} ===`);
	const body: ProxyRequest = {
		endpoint: "chat.completions",
		payload,
		metadata: { requestId: `smoke-${label.toLowerCase().replace(/\s+/g, "-")}` },
	};

	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error(`Request failed (${res.status}): ${errorText}`);
		return;
	}

	const text = await res.text();
	console.log(`Response (${res.status}):`);
	console.log(text);
};

const callResponsesProxy = async (label: string, payload: ProxyRequest["payload"]) => {
	console.log(`\n=== ${label} (responses) ===`);
	const body: ProxyRequest = {
		endpoint: "responses",
		payload,
		metadata: { requestId: `responses-${label.toLowerCase().replace(/\s+/g, "-")}` },
	};

	const res = await fetch(ENDPOINT, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});

	if (!res.ok) {
		const errorText = await res.text();
		console.error(`Responses request failed (${res.status}): ${errorText}`);
		return;
	}

	const text = await res.text();
	console.log(`Response (${res.status}):`);
	console.log(text);
};

const textOnlyPayload = {
	model: "openai/gpt-4o-mini",
	messages: [
		{ role: "system", content: "You are a concise assistant." },
		{ role: "user", content: "Summarize the benefits of TypeScript in one sentence." },
	],
};

const responsesTextPayload = {
	model: "openai/gpt-4o-mini",
	instructions: "You are a concise assistant.",
	input: "Summarize the benefits of static typing in one line.",
};

const responsesTextToImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { size: "1024x1024", format: "png" },
	input: "Create a watercolor painting of a cozy cabin in winter.",
};

const responsesMultimodalTextPayload = {
	model: "openai/gpt-4o-mini",
	instructions: "Describe images in haiku form.",
	input: [
		{
			role: "user",
			content: [
				{ type: "input_text", text: "Describe this picture as a haiku." },
				{
					type: "input_image",
					image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
					detail: "high",
				},
			],
		},
	],
};

const responsesMultimodalImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { aspect_ratio: "16:9", format: "png" },
	input: [
		{
			role: "user",
			content: [
				{ type: "input_text", text: "Create a magazine cover illustration inspired by this reference." },
				{
					type: "input_image",
					image_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
					detail: "high",
				},
			],
		},
	],
};

const textToImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { size: "1024x1024", format: "png" },
	messages: [
		{
			role: "user",
			content: [
				{ type: "text", text: "Create a futuristic city skyline at dusk, cinematic lighting." },
			],
		},
	],
};

const multimodalToTextPayload = {
	model: "openai/gpt-4o-mini",
	messages: [
		{ role: "system", content: "Describe images in haiku form." },
		{
			role: "user",
			content: [
				{ type: "text", text: "Describe this picture as a haiku." },
				{
					type: "image_url",
					image_url: {
						url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
					},
				},
			],
		},
	],
};

const multimodalToImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { aspect_ratio: "16:9", format: "png" },
	messages: [
		{
			role: "user",
			content: [
				{ type: "text", text: "Create an illustrated magazine cover based on this mood board." },
				{
					type: "image_url",
					image_url: {
						url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
						detail: "high",
					},
				},
			],
		},
	],
};

const base64ImageDataUri = "data:image/png;base64,REPLACE_WITH_BASE64_DATA";
const multimodalBase64ToImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { aspect_ratio: "16:9", format: "png" },
	messages: [
		{
			role: "user",
			content: [
				{
					type: "text",
					text: "Create a magazine cover illustration inspired by this reference; keep a cinematic, high-contrast look.",
				},
				{
					type: "image_url",
					image_url: {
						url: base64ImageDataUri,
						detail: "high",
					},
				},
			],
		},
	],
};
const multimodalBase64ToTextPayload = {
	model: "openai/gpt-4o-mini",
	messages: [
		{ role: "system", content: "Describe images in one short sentence." },
		{
			role: "user",
			content: [
				{ type: "text", text: "What is in this image?" },
				{
					type: "image_url",
					image_url: {
						url: base64ImageDataUri,
						detail: "high",
					},
				},
			],
		},
	],
};

const responsesBase64ImagePayload = {
	model: "openai/gpt-4o-mini",
	instructions: "Describe images in one short sentence.",
	input: [
		{
			role: "user",
			content: [
				{ type: "input_text", text: "What is in this image?" },
				{
					type: "input_image",
					image_url: base64ImageDataUri,
					detail: "high",
				},
			],
		},
	],
};
const responsesBase64ImageToImagePayload = {
	model: "google/gemini-2.5-flash-image",
	modalities: ["image"],
	image_config: { aspect_ratio: "16:9", format: "png" },
	input: [
		{
			role: "user",
			content: [
				{
					type: "input_text",
					text: "Create a cinematic magazine cover illustration based on this reference image.",
				},
				{
					type: "input_image",
					image_url: base64ImageDataUri,
					detail: "high",
				},
			],
		},
	],
};

(async () => {
    // chat.completions

	await callProxy("Text → Text", textOnlyPayload);
	await sleep(500);

	await callProxy("Text → Image", textToImagePayload);
	await sleep(500);

	await callProxy("Text+Image → Text", multimodalToTextPayload);
	await sleep(500);

	await callProxy("Text+Image → Image", multimodalToImagePayload);
	await sleep(500);

	await callProxy("Text + Base64 Image → Text", multimodalBase64ToTextPayload);
	await sleep(500);

	await callProxy("Text + Base64 Image → Image", multimodalBase64ToImagePayload);
	await sleep(500);

	// responses

	await callResponsesProxy("Responses Text → Text", responsesTextPayload);
	await sleep(500);

	await callResponsesProxy("Responses Text → Image", responsesTextToImagePayload);
	await sleep(500);

	await callResponsesProxy("Responses Text+Image → Text", responsesMultimodalTextPayload);
	await sleep(500);

	await callResponsesProxy("Responses Text+Image → Image", responsesMultimodalImagePayload);
	await sleep(500);

	await callResponsesProxy("Responses Text + Base64 Image → Text", responsesBase64ImagePayload);
	await sleep(500);

	await callResponsesProxy("Responses Text + Base64 Image → Image", responsesBase64ImageToImagePayload);
})();

// #### Example responses:

// === Text → Text ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1764926476-0N0195qHFzGljvYKVijc","provider":"OpenAI","model":"openai/gpt-4o-mini","object":"chat.completion","created":1764926476,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"stop","index":0,"message":{"role":"assistant","content":"TypeScript enhances JavaScript development by providing static typing, improved code quality, better tooling, and early error detection, leading to more robust and maintainable codebases.","refusal":null,"reasoning":null}}],"system_fingerprint":"fp_aa07c96156","usage":{"prompt_tokens":29,"completion_tokens":33,"total_tokens":62,"cost":0.00002415,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.00000435,"upstream_inference_completions_cost":0.0000198},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":0}}},"meta":{"endpoint":"chat.completions","elapsedMs":596,"requestId":"smoke-text-→-text"}},"statusCode":200}

// === Text → Image ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1764926649-tF4W3t4FuuPsXb0VBWLB","provider":"Google AI Studio","model":"google/gemini-2.5-flash-image","object":"chat.completion","created":1764926649,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"STOP","index":0,"message":{"role":"assistant","content":"","refusal":null,"reasoning":null,"images":[{"type":"image_url","image_url":{"url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA....Ywy4AAAAASUVORK5CYII="},"index":0}]}}],"usage":{"prompt_tokens":12,"completion_tokens":1290,"total_tokens":1302,"cost":0.0387036,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.0000036,"upstream_inference_completions_cost":0.0387},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":1290}}},"meta":{"endpoint":"chat.completions","elapsedMs":8796,"requestId":"smoke-text-→-image"}},"statusCode":200}

// === Text+Image → Text ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1764926740-2URsEndpDLg4aKhrce5p","provider":"OpenAI","model":"openai/gpt-4o-mini","object":"chat.completion","created":1764926740,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"stop","index":0,"message":{"role":"assistant","content":"Mountains touch the sky,  \nA lone figure stands so still,  \nNature's breath whispers.","refusal":null,"reasoning":null}}],"system_fingerprint":"fp_67cf3fed12","usage":{"prompt_tokens":36861,"completion_tokens":20,"total_tokens":36881,"cost":0.00554115,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.00552915,"upstream_inference_completions_cost":0.000012},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":0}}},"meta":{"endpoint":"chat.completions","elapsedMs":2060,"requestId":"smoke-text+image-→-text"}},"statusCode":200}

// === Text+Image → Image ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1764926781-v0R1PKLTGF58tfP47ltk","provider":"Google AI Studio","model":"google/gemini-2.5-flash-image","object":"chat.completion","created":1764926781,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"STOP","index":0,"message":{"role":"assistant","content":"","refusal":null,"reasoning":null,"images":[{"type":"image_url","image_url":{"url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA....AAAAAASUVORK5CYII="},"index":0}]}}],"usage":{"prompt_tokens":270,"completion_tokens":1290,"total_tokens":1560,"cost":0.038781,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.000081,"upstream_inference_completions_cost":0.0387},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":1290}}},"meta":{"endpoint":"chat.completions","elapsedMs":8532,"requestId":"smoke-text+image-→-image"}},"statusCode":200}

// === Text + Base64 Image → Text ====

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1765086901-B9GKizwPmLdJDj421FR7","provider":"OpenAI","model":"openai/gpt-4o-mini","object":"chat.completion","created":1765086901,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"stop","index":0,"message":{"role":"assistant","content":"The image shows a cartoon character with cat-like features and octopus tentacles, standing in a puddle.","refusal":null,"reasoning":null}}],"system_fingerprint":"fp_6318584bd8","usage":{"prompt_tokens":25525,"completion_tokens":22,"total_tokens":25547,"cost":0.00384195,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.00382875,"upstream_inference_completions_cost":0.0000132},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":0}}},"meta":{"endpoint":"chat.completions","elapsedMs":627,"requestId":"smoke-text-+-base64-image-→-text"}},"statusCode":200}

// === Text + Base64 Image → Image ====

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"id":"gen-1765087075-fmNq6ct9nLcvNbq6OCh9","provider":"Google AI Studio","model":"google/gemini-2.5-flash-image","object":"chat.completion","created":1765087075,"choices":[{"logprobs":null,"finish_reason":"stop","native_finish_reason":"STOP","index":0,"message":{"role":"assistant","content":"","refusal":null,"reasoning":null,"images":[{"type":"image_url","image_url":{"url":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABUAAA.....yz36uQKlxQu/z9gz4T6PavN3AAAAABJRU5ErkJggg=="},"index":0}]}}],"usage":{"prompt_tokens":278,"completion_tokens":1290,"total_tokens":1568,"cost":0.0387834,"is_byok":false,"prompt_tokens_details":{"cached_tokens":0,"audio_tokens":0,"video_tokens":0},"cost_details":{"upstream_inference_cost":null,"upstream_inference_prompt_cost":0.0000834,"upstream_inference_completions_cost":0.0387},"completion_tokens_details":{"reasoning_tokens":0,"image_tokens":1290}}},"meta":{"endpoint":"chat.completions","elapsedMs":8407,"requestId":"smoke-text-+-base64-image-→-image"}},"statusCode":200}

// === Responses Text → Text ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1764952988-CZnq2358Nq8oGK6YfMBp","created_at":1764952988,"model":"openai/gpt-4o-mini","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"Static typing enhances code reliability by catching type-related errors at compile time, improving maintainability and clarity.","annotations":[]}],"id":"msg_tmp_29l61d5jo53"}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":19,"input_tokens_details":{"cached_tokens":0},"output_tokens":20,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":39,"cost":0.00001485,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.00000285,"upstream_inference_output_cost":0.000012}}},"meta":{"endpoint":"responses","elapsedMs":870,"requestId":"responses-responses-text-→-text"}},"statusCode":200}

// === Responses Text → Image ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1764953206-sYVybrPT0BXzTsnOdD0U","created_at":1764953206,"model":"google/gemini-2.5-flash-image","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"Here's a watercolor painting of a cozy cabin in winter for you! ","annotations":[]}],"id":"msg_tmp_bg3vndmvz8k"},{"type":"image_generation_call","id":"msg_tmp_cpbbdma48kh","status":"completed","result":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABAAAAAQACAIAAADwf7z.....gr/v4/t4eaH8jCfN4AAAAASUVORK5CYII="}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":12,"input_tokens_details":{"cached_tokens":0},"output_tokens":1306,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":1318,"cost":0.0387436,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.0000036,"upstream_inference_output_cost":0.03874}}},"meta":{"endpoint":"responses","elapsedMs":1095,"requestId":"responses-responses-text-→-image"}},"statusCode":200}

// === Responses Text+Image → Text ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1764953311-yVG7vOpch3yb1XciqQzt","created_at":1764953311,"model":"openai/gpt-4o-mini","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"Majestic peaks rise,  \nA lone figure greets the dawn,  \nWhispers of the wild.  ","annotations":[]}],"id":"msg_tmp_b6jmt8y6tp"}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":36850,"input_tokens_details":{"cached_tokens":0},"output_tokens":22,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":36872,"cost":0.0055407,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.0055275,"upstream_inference_output_cost":0.0000132}}},"meta":{"endpoint":"responses","elapsedMs":2176,"requestId":"responses-responses-text+image-→-text"}},"statusCode":200}

// === Responses Text+Image → Image ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1764953402-w7pH6OW8p6b1VBPoEUv4","created_at":1764953402,"model":"google/gemini-2.5-flash-image","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"Here's a magazine cover illustration inspired by your reference. I've aimed for a dramatic and inspiring feel, highlighting the solitary figure against the vast mountain landscape. `\n\n`","annotations":[]}],"id":"msg_tmp_0e2sbv32zrfn"},{"type":"image_generation_call","id":"msg_tmp_n63016q8un","status":"completed","result":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABOAAAANACAIAAAANYoVHAAAAi......Ha9WxjiAAAAAElFTkSuQmCC"}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":3364,"input_tokens_details":{"cached_tokens":0},"output_tokens":1326,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":4690,"cost":0.0397992,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.0010092,"upstream_inference_output_cost":0.03879}}},"meta":{"endpoint":"responses","elapsedMs":2259,"requestId":"responses-responses-text+image-→-image"}},"statusCode":200}

// Responses Text + Base64 Image → Text ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1765087236-DwWhTcTqBbsgdrEicA5H","created_at":1765087236,"model":"openai/gpt-4o-mini","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"The image features a cute character designed to resemble a cat and an octopus. It has a rounded head with cat ears, large eyes, and a smiling face. The body is mostly black, with several octopus-like tentacles extending from the bottom. The character is standing on a blue circular base, which may represent water or a surface. This character is often associated with GitHub, a popular platform for software development and version control.","annotations":[]}],"id":"msg_tmp_knceatz9a5"}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":25514,"input_tokens_details":{"cached_tokens":0},"output_tokens":88,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":25602,"cost":0.0038799,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.0038271,"upstream_inference_output_cost":0.0000528}}},"meta":{"endpoint":"responses","elapsedMs":905,"requestId":"responses-responses-text-+-base64-image-→-text"}},"statusCode":200}

// Responses Text + Base64 Image → Image ===

// {"success":true,"message":"OpenRouter request completed","responseObject":{"upstream":{"object":"response","id":"gen-1765087343-UINxGy7gkB3qWIXmMnAz","created_at":1765087343,"model":"google/gemini-2.5-flash-image","error":null,"output_text":"","output":[{"role":"assistant","type":"message","status":"completed","content":[{"type":"output_text","text":"Here's a cinematic magazine cover illustration based on the reference image! ","annotations":[]}],"id":"msg_tmp_369arx13pl7"},{"type":"image_generation_call","id":"msg_tmp_yebl1x2jo2","status":"completed","result":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABG.....Ufpz+GP7I3wAAAABJRU5ErkJggg=="}],"incomplete_details":null,"tools":[],"tool_choice":"auto","parallel_tool_calls":true,"max_output_tokens":null,"temperature":null,"top_p":null,"metadata":{},"background":false,"previous_response_id":null,"service_tier":"auto","truncation":null,"store":false,"instructions":null,"reasoning":null,"safety_identifier":null,"prompt_cache_key":null,"user":null,"usage":{"input_tokens":271,"input_tokens_details":{"cached_tokens":0},"output_tokens":1305,"output_tokens_details":{"reasoning_tokens":0},"total_tokens":1576,"cost":0.0388188,"is_byok":false,"cost_details":{"upstream_inference_cost":null,"upstream_inference_input_cost":0.0000813,"upstream_inference_output_cost":0.0387375}}},"meta":{"endpoint":"responses","elapsedMs":993,"requestId":"responses-responses-text-+-base64-image-→-image"}},"statusCode":200}
