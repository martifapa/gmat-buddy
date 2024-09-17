import groq from "../groq";
import { data } from "./data";
import { Question, ReadingQuestion } from "./types";


// AI - PROMPTS
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
}

export const buildPrompt = (base: string, examples: Question[] | ReadingQuestion[], question: string, explanation: string='empty'): string => {
  let parsedExamples = '';
  if (isReadingQuestion(examples[0])) {
    parsedExamples += 'Text: ' + examples[0].text + '\n';
    parsedExamples += (examples[0] as ReadingQuestion).questions.map(q =>
      `Reference question: ${q.question}
      Reference answer index: ${q.correct}
      Reference explanation: ${q.explanation}
      ---
      Question to solve: ${question}`).join('\n\n');
  } else {
    parsedExamples += (examples as Question[]).map(example =>
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

// GET DATA
const isReadingQuestion = (item: Question | ReadingQuestion): item is ReadingQuestion => {
  return (item as ReadingQuestion).text !== undefined;
}

export const getTrainingData = (type: string): Question[] | ReadingQuestion[] => {
  const trainingData = data.filter(question => 
    question.type.toLowerCase().includes(type.toLowerCase()));
  // Type guard to ensure correct return type
  if (trainingData.length > 0 && isReadingQuestion(trainingData[0])) {
    return trainingData as ReadingQuestion[];
  } else {
    return trainingData as Question[]
  }
}

export const AIAnswerToObject = (text: string) => {
  try { // text correctly formatted as JSON
    const json = JSON.parse(text);
    return json;
  } catch (error) { // malformatted JSON -> try to parse with regex
    try {
      const answerIdxRegex = /"answerIdx": ([0-4])/; // matches 0 to 4 after "answerIdx"
      const explanationRegex = /(?<="explanation": )[\s\S]*/;  // matches EVERYTHING after "explanation"
      
      const answerIdxMatch =  text.match(answerIdxRegex);
      const explantionMatch = text.match(explanationRegex);

      if (answerIdxMatch && explantionMatch) {
        const answerIdx = answerIdxMatch[1]; // Get capture group
        const explanation = explantionMatch[0];

        const json = { answerIdx, explanation };
        return json;
      } else {
        console.error('Regex match failed');
        return null;
      }
    } catch (finalError) {
      console.error(finalError);
      return null
    }
  }
};