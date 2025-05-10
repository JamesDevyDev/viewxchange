import 'dotenv'

export const myAi = async (text: string): Promise<string> => {
    const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [
                {
                    role: 'system',
                    content:
                        'You are a perspective generator. When given a topic or statement, you generate three different thoughtful perspectives or interpretations about it. Make them distinct, concise, and insightful. Label them as “Perspective 1”, “Perspective 2”, and “Perspective 3”.',
                },
                { role: 'user', content: text },
            ],
        }),
    });

    const data = await res.json();
    return data.choices?.[0]?.message?.content || "No response.";
};
