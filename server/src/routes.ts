import {FastifyInstance} from "fastify";
import dayjs from "dayjs";
import {z} from "zod";
import { prisma } from "./lib/prisma";

export async function appRoutes(app: FastifyInstance) {
  app.post("/habits", async (request) => {
    const createHabitBody = z.object({
      title: z.string(),
      weekDays: z.array(z.number().min(0).max(6))
    })

    const {title, weekDays} = createHabitBody.parse(request.body);

    const today = dayjs().startOf('day').toDate(); //limpa a hora
    
    await prisma.habit.create({
      data: {
        title,
        created_at: today,
        habitWeekDays: {
          create: weekDays.map(weekDay => {
            return {
              week_day: weekDay
            }
          })
        }
      }
    });
  });  

  app.get("/day", async (request) => {
    const getDayParams = z.object({
      date: z.coerce.date() //vai transformar para o formato date
    });

    
    const {date} = getDayParams.parse(request.query);
    
    const parsedDate = dayjs(date).startOf("day");
    const weekDay = parsedDate.get("day"); //retorna o dia da semana: 0 domingo, 1 segunda ...

    const possibleHabits = await prisma.habit.findMany({
      where: {
        created_at: {
          lte: date, //menor ou igual à...
        },
        habitWeekDays: {
          some: {
            week_day: weekDay
          }
        }
      }
    });

    const day = await prisma.day.findFirst({
      where: {
        date: parsedDate.toDate()
      },
      include: {
        dayHabits: true
      }
    });

    const completedHabits = day?.dayHabits.map(dayHabit => {
      return dayHabit.habit_id;
    });


    return {
      possibleHabits,
      completedHabits
    }
  });
}
