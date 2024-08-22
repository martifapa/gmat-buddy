import groq from "../groq";


export const promptGroq = async (prompt: string): Promise<string> => {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "model": "llama3-groq-70b-8192-tool-use-preview",
        "temperature": 0.5,
        "max_tokens": 1024,
        "top_p": 0.65,
        "stream": true,
        "stop": null
    });

    let answer = '';
    for await (const chunk of chatCompletion) {
        answer += chunk.choices[0]?.delta?.content || '';
    }

    return answer;
}