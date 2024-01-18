// import { $fetch } from 'ofetch';

// interface OpenAIResponse {
//     choices: Array<{
//         text: string;
//     }>;
//     // other expected fields...
// }

// export const openaiService = {
//     async generateText(prompt: string): Promise<string | null> {
//         const headers = {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//         };

//         const data = {
//             prompt: prompt,
//             max_tokens: 150
//         };

//         try {
//             const response = await $fetch<OpenAIResponse>('https://api.openai.com/v1/engines/davinci-codex/completions', {
//                 method: 'POST',
//                 headers: headers,
//                 body: data
//             });
//             return response.choices[0].text;
//         } catch (error) {
//             console.error('Error calling OpenAI API:', error);
//             return null;
//         }
//     }
// };
