import OpenAI from 'openai';
import { defineEventHandler, sendError, getQuery } from 'h3';

export default defineEventHandler(async (event) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        sendError(event, new Error('API key is not set'));
        return;
    }

    const openai = new OpenAI({ apiKey });
    const query = getQuery(event);
    const goal = query.goal as keyof typeof supplementsByGoal;

    const supplementsByGoal = {
        loseWeight: 5,
        getStronger: 5,
        recoverFaster: 5
    };

    const numberOfSupplements = supplementsByGoal[goal] || 5;

    try {
        const prompt = `Create a list of ${numberOfSupplements} highly researched sports-approved supplements for someone who wants to ${goal}. List them in a structured format with each supplement's Name, Recommended Dosage, and a brief Description.`;

        const completion = await openai.chat.completions.create({
            messages: [{
                role: "system",
                content: prompt
            }],
            model: "gpt-3.5-turbo",
        });

        const responseText = completion.choices[0].message.content;
        if (!responseText) {
            return 'No response generated';
        }

        return responseText;
    } catch (error) {
        if (error instanceof Error) {
            sendError(event, error);
        } else {
            sendError(event, new Error('An unknown error occurred'));
        }
    }
});
