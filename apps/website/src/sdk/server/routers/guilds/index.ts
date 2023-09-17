import { prisma } from '@/sdk/lib/prisma'
import { router, publicProcedure } from '@/sdk/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { loggedInProcedure } from '../../middlewares'
import { getI18n } from '@/sdk/locales/server'

export const guildsRouter = router({
  applyToGuild: loggedInProcedure
    .input(
      z.object({
        guildId: z.number(),
        playerId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = await getI18n()
      const { session } = ctx

      const playerIsValid = await prisma.players.findFirst({
        where: {
          id: input.playerId,
          account_id: Number(session.user.id),
          guild_membership: {
            isNot: {
              guild_id: input.guildId,
            },
          },
          guild_invites: {
            none: {
              guild_id: input.guildId,
            },
          },
        },
      })

      if (!playerIsValid) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotValid'),
        })
      }

      const guildExists = await prisma.guilds.findFirst({
        where: {
          id: input.guildId,
        },
      })

      if (!guildExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'guild',
          message: t('quixer.errors.guildNotFound'),
        })
      }

      const playerIsAlreadyInSomeGuild =
        await prisma.guild_membership.findFirst({
          where: {
            player_id: input.playerId,
          },
        })

      if (playerIsAlreadyInSomeGuild) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: t('quixer.errors.playerAlreadyInSomeGuild'),
        })
      }

      await prisma.guild_invites.create({
        data: {
          guild_id: input.guildId,
          player_id: input.playerId,
          date: Math.floor(new Date().getTime() / 1000),
        },
      })

      return true
    }),
  getCharacterAllowToApply: loggedInProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      const { session } = ctx

      const myCharacters = await prisma.players.findMany({
        where: {
          account_id: Number(session.user.id),
          guild_membership: {
            isNot: {
              guild_id: input,
            },
          },
          guild_invites: {
            none: {
              guild_id: input,
            },
          },
        },
      })

      return myCharacters.map((char) => {
        return {
          name: char.name,
          id: char.id,
        }
      })
    }),
  rejectInviteForGuild: loggedInProcedure
    .input(
      z.object({
        guildId: z.number(),
        playerId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = await getI18n()
      const { session } = ctx

      const playerIsValid = await prisma.players.findFirst({
        where: {
          id: input.playerId,
          account_id: Number(session.user.id),
        },
      })

      if (!playerIsValid) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotFound'),
        })
      }

      const guildExists = await prisma.guilds.findFirst({
        where: {
          id: input.guildId,
        },
      })

      if (!guildExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'guild',
          message: t('quixer.errors.guildNotFound'),
        })
      }

      /**
       * @ALERT
       * This is a function to remove a player from the invites list
       */
      await prisma.guild_invites.delete({
        where: {
          player_id_guild_id: {
            guild_id: input.guildId,
            player_id: input.playerId,
          },
        },
      })

      return true
    }),
  acceptInviteForGuild: loggedInProcedure
    .input(
      z.object({
        guildId: z.number(),
        playerId: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const t = await getI18n()
      const { session } = ctx

      const playerIsValid = await prisma.players.findFirst({
        where: {
          id: input.playerId,
          account_id: Number(session.user.id),
        },
      })

      if (!playerIsValid) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'player',
          message: t('quixer.errors.playerNotFound'),
        })
      }

      const guildExists = await prisma.guilds.findFirst({
        where: {
          id: input.guildId,
        },
      })

      if (!guildExists) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          cause: 'guild',
          message: t('quixer.errors.guildNotFound'),
        })
      }

      const guildMembershipExists = await prisma.guild_membership.findFirst({
        where: {
          guild_id: input.guildId,
          player_id: input.playerId,
        },
      })

      if (guildMembershipExists) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: t('quixer.errors.playerAlreadyInGuild'),
        })
      }

      const ranks = await prisma.guild_ranks.findMany({
        where: {
          guild_id: input.guildId,
        },
      })

      const lowestRank = ranks.reduce((prev, curr) => {
        return prev.level < curr.level ? prev : curr
      }, ranks[0])

      /**
       * @ALERT
       * This is a function to add a player to a guild
       */
      await prisma.guild_membership.create({
        data: {
          guild_id: input.guildId,
          player_id: input.playerId,
          rank_id: lowestRank.id,
        },
      })

      /**
       * @ALERT
       * This is a function to remove a player from the invites list
       */
      await prisma.guild_invites.delete({
        where: {
          player_id_guild_id: {
            guild_id: input.guildId,
            player_id: input.playerId,
          },
        },
      })

      return true
    }),
  getInvitedPlayers: publicProcedure
    .input(z.number())
    .query(async ({ input }) => {
      return await prisma.guild_invites.findMany({
        where: {
          guild_id: input,
        },
        include: {
          players: {
            select: {
              level: true,
              name: true,
            },
          },
        },
      })
    }),
  getPlayers: publicProcedure.input(z.number()).query(async ({ input }) => {
    const membership = await prisma.guild_membership.findMany({
      where: {
        guild_id: input,
      },
      orderBy: {
        guild_ranks: {
          level: 'desc',
        },
      },
      include: {
        guilds: {
          select: {
            ownerid: true,
          },
        },
        guild_ranks: {
          select: {
            name: true,
          },
        },
        players: {
          include: {
            players_online: {
              select: {
                player_id: true,
              },
            },
          },
        },
      },
    })

    // ALERT - This is a workaround to put the owner on the first position of the array
    const ownerIndex = membership.findIndex(
      (member) => member.player_id === membership[0].guilds.ownerid
    )

    if (ownerIndex > -1) {
      const owner = membership.splice(ownerIndex, 1)

      membership.unshift(owner[0])
    }

    const players = membership.map((member) => {
      const { name, vocation, level, players_online } = member.players

      return {
        name,
        vocation,
        level,
        surname: member.nick,
        rank: member.guild_ranks.name,
        online: !!players_online?.player_id,
        createdAt: member.createdAt,
      }
    })

    return players
  }),
  findByName: publicProcedure.input(z.string()).query(async ({ input }) => {
    const t = await getI18n()
    const guild = await prisma.guilds.findUnique({
      include: {
        worlds: {
          select: {
            name: true,
          },
        },
      },
      where: {
        name: input,
      },
    })

    if (!guild) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        cause: 'guild',
        message: t('quixer.errors.guildNotFound'),
      })
    }

    const serializedBalance = Number(guild.balance)

    return {
      ...guild,
      balance: serializedBalance,
    }
  }),
  all: publicProcedure
    .input(
      z.object({
        worldId: z.number().optional(),
        worldName: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const guilds = await prisma.guilds.findMany({
        include: {
          worlds: {
            select: {
              name: true,
            },
          },
        },
        where: {
          world_id: input?.worldId,
          worlds: {
            name: {
              contains: input?.worldName,
            },
          },
        },
      })

      const serializedGuilds = guilds.map((guild) => {
        const serializedBalance = Number(guild.balance)

        return {
          ...guild,
          balance: serializedBalance,
        }
      })

      return serializedGuilds
    }),
})
