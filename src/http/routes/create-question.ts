import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod';
import { z } from 'zod/v4';
import { db } from '../../db/connection.ts';
import { schema } from '../../db/schema/index.ts';

export const createQuestion: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/rooms/:roomId/questions',
    {
      schema: {
        params: z.object({
          roomId: z.string().min(1, 'Room ID is required'),
        }),
        body: z.object({
          question: z.string().min(1, 'Question is required'),
        }),
        response: {
          201: z.object({
            questionId: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { roomId } = request.params;
      const { question } = request.body;

      const result = await db
        .insert(schema.questions)
        .values({
          roomId,
          question,
        })
        .returning();

      const insertedQuestion = result[0];

      if (!insertedQuestion) {
        throw new Error('Failed to create question');
      }

      return reply.status(201).send({
        questionId: insertedQuestion.id,
      });
    }
  );
};
