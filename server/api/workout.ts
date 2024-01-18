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
    const muscleGroup = query.muscleGroup as string;
    const difficulty = query.difficulty as keyof typeof exercisesByDifficulty;

    const exercisesByDifficulty = {
        easy: 5,
        intermediate: 8,
        hard: 12
    };

    const numberOfExercises = exercisesByDifficulty[difficulty] || 5;

    try {
        const prompt = `Create a workout plan for ${muscleGroup}, suitable for a ${difficulty} level. Include ${numberOfExercises} exercises. Format each exercise as follows: 'Exercise [number] - [Exercise Name]: Sets - [X], Reps - [Y], Description - [short description].'`;

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
