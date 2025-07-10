import { GoogleGenAI } from '@google/genai';
import { environment } from '../environments.ts';

const gemini = new GoogleGenAI({
  apiKey: environment.GOOGLE_GENAI_API_KEY,
});

const model = 'gemini-2.5-flash';

export async function transcribeAudio(audioAsBase64: string, mimeType: string) {
  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Transcreva o audio para português brasileiro. Seja preciso e natural na transcrição. Mantenha a pontuação adequada e divida o texto em parágrafos quando for apropriado.',
      },
      {
        inlineData: {
          mimeType,
          data: audioAsBase64,
        },
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to transcribe audio');
  }

  return response.text;
}

export async function generateEmbeddings(text: string) {
  const response = await gemini.models.embedContent({
    model: 'text-embedding-004',
    contents: [{ text }],
    config: {
      taskType: 'RETRIEVAL_DOCUMENT',
    },
  });

  if (!response.embeddings?.[0].values) {
    throw new Error('Failed to generate embeddings');
  }

  return response.embeddings[0].values;
}

export async function generateAnswer(
  question: string,
  transcription: string[]
) {
  const context = transcription.join('\n\n');

  const prompt = `
  Com base no texto fornecido abaixo como contexto, responda a pergunta de forma clara e precisa em português brasileiro.

  Contexto:
  ${context}

  Pergunta:
  ${question}

  INSTRUÇÕES:
  - Use apenas informações contidas no contexto fornecido;
  - Se a resposta não for encontrada no contexto, apenas responda que não possui informações o suficiente para responder;
  - Seja direto e objetivo;
  - Mantenha um tom educativo e profissional;
  - Evite suposições ou informações não verificadas;
  - Cite trechos relevantes do contexto apropriado;
  - Se for citar o contexto, utilize o termo conteudo da aula;
  `;

  const response = await gemini.models.generateContent({
    model,
    contents: [
      {
        text: 'Responda a pergunta com base no contexto fornecido. Seja preciso e direto na resposta.',
      },
      {
        text: prompt,
      },
    ],
  });

  if (!response.text) {
    throw new Error('Failed to generate answer with Gemini');
  }

  return response.text;
}
