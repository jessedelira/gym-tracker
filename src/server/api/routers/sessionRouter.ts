import { PrismaClient, SessionDaysActive } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure} from "../trpc";

const primsa = new PrismaClient();

export const sessionRouter = createTRPCRouter({
    createSession: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
                days: z.string().array(),
            }),
        )
        .mutation(async ({ input }) => {
            // Create a new session
            const createdSession = await primsa.session.create({
                data: {
                    name: input.name,
                    description: input.description,
                },
            });
            console.log('createdSession', createdSession);

            // Create the SessionDayActive record (mon, tue, wed, thu, fri, sat, sun)
            input.days.forEach((day) => {
                const createdSessionDayActive = primsa.sessionDaysActive.create({
                    data: {
                        day: day,
                        sessionId: createdSession.id,
                    },
                });

                console.log('createdSessionDayActive', createdSessionDayActive);    
            });

            return createdSession;
        }),
});

