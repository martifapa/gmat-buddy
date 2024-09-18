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