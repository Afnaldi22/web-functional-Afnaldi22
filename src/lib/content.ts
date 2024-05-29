const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {

    try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.text();
        return data;
      } catch (error) {
        return "<speak><s>There was an error</s></speak>";
      }
    };

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */

const parseContentIntoSentences = (content: string): string[] => {
    const sentences: string[] = [];
    const sentenceRegex = /<s>(.*?)<\/s>/g;
    let match;
  
    while ((match = sentenceRegex.exec(content)) !== null) {
      sentences.push(match[1].trim());
    }
  
    return sentences;
};
const parseContentIntoSentences = (content: string) => {};

export { fetchContent, parseContentIntoSentences };
