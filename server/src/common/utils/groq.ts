import groq from "../../groq";
import { TrainQuestion, TrainReadingQuestion } from "../types";


export const promptGroq = async (prompt: string, temperature:number=0.5): Promise<string> => {
    const chatCompletion = await groq.chat.completions.create({
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "model": "llama3-8b-8192",
        "temperature": temperature,
        "max_tokens": 1024,
        "top_p": 1,
        "stream": true,
        "stop": null
    });

    let answer = '';
    for await (const chunk of chatCompletion) {
        answer += chunk.choices[0]?.delta?.content || '';
    }

    return answer;
};

const isReadingQuestion = (item: TrainQuestion | TrainReadingQuestion): item is TrainReadingQuestion => {
  return (item as TrainReadingQuestion).text !== undefined;
}

export const buildPrompt = (base: string, examples: TrainQuestion[] | TrainReadingQuestion[], question: string, explanation: string='empty'): string => {
  let parsedExamples = '';
  if (isReadingQuestion(examples[0])) {
    parsedExamples += 'Text: ' + examples[0].text + '\n';
    parsedExamples += (examples[0] as TrainReadingQuestion).questions.map(q =>
      `Reference question: ${q.question}
      Reference answer index: ${q.correct}
      Reference explanation: ${q.explanation}
      ---
      Question to solve: ${question}`).join('\n\n');
  } else {
    parsedExamples += (examples as TrainQuestion[]).map(example =>
      `Reference question: ${example.question}
      Reference answer index: ${example.correct}
      Reference explanation: ${example.explanation}
      ---
      Question to solve: ${question}`).join('\n\n');
  }
  if (explanation !== 'empty') {
    parsedExamples += `
    Provided explanation: ${explanation}`;
  }

  return `${base}
  ${parsedExamples}`;
}