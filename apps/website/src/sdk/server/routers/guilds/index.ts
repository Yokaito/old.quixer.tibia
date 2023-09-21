import { prisma } from '@/sdk/lib/prisma'
import { router, publicProcedure } from '@/sdk/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { loggedInProcedure } from '../../middlewares'
import { getI18n } from '@/sdk/locales/server'

export const guildsRouter = router({
  leaveGuild: loggedInProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      const { session } = ctx
      const t = await getI18n()

      const playerIsValid = await prisma.players.findFirst({
        where: {
          id: input,
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

      /**
       * @ALERT - This verified if player is owner of a guild and if he is, send a message of error
       * This message is to prevent the player from leaving the guild and the guild being without an owner
       * The message could be something like
       * "You can't leave the guild because you are the owner, you need to transfer the ownership to another player"
       */
      const playerIsOwner = await prisma.guilds.findFirst({
        where: {
          ownerid: input,
        },
      })

      if (playerIsOwner) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: t('quixer.errors.youAreTheLeader'),
        })
      }

      /**
       * @ALERT - This functions prevents the player from leaving the guild if he is the only one in the guild
       */
      const guildHasOnlyOneMember = await prisma.guild_membership.count()

      if (guildHasOnlyOneMember === 1) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: t('quixer.errors.cantLeaveOnlyMember'),
        })
      }

      await prisma.guild_membership.delete({
        where: {
          player_id: input,
        },
      })

      return true
    }),
  create: loggedInProcedure
    .input(
      z.object({
        name: z
          .string()
          .min(4)
          .max(20)
          /**
           * @ALERT - This is a regex to only allow letters and numbers
           */
          .regex(/^[a-zA-Z0-9 ]*$/),
        worldId: z.number(),
        ownerId: z.number(),
        logo: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const guildWithSameName = await prisma.guilds.findFirst({
        where: {
          name: input.name,
        },
      })

      if (guildWithSameName) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: 'Guild with same name already exists',
        })
      }

      /**
       * @ALERT - This cancel all invitations for the player
       */
      await prisma.guild_invites.deleteMany({
        where: {
          player_id: input.ownerId,
        },
      })

      const playerIsAllowedToCreateGuild = await prisma.players.findFirst({
        where: {
          id: input.ownerId,
          guild_membership: {
            is: null,
          },
        },
      })

      if (!playerIsAllowedToCreateGuild) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          cause: 'guild',
          message: 'Player is already in a guild',
        })
      }

      /**
       * @ALERT - Theres a trigger in database when a guild is created that automatically creates a ranks
       * 3 - Leader
       * 2 - Vice Leader
       * 1 - Member
       */
      const guild = await prisma.guilds.create({
        data: {
          name: input.name,
          world_id: input.worldId,
          ownerid: input.ownerId,
          balance: 0,
          level: 1,
          logo: input.logo,
          creationdata: Math.floor(new Date().getTime() / 1000),
        },
      })

      const ranksForThisGuild = await prisma.guild_ranks.findMany({
        where: {
          guild_id: guild.id,
        },
      })

      const getHighestRank = ranksForThisGuild.reduce((prev, curr) => {
        return prev.level > curr.level ? prev : curr
      }, ranksForThisGuild[0])

      await prisma.guild_membership.create({
        data: {
          guild_id: guild.id,
          player_id: input.ownerId,
          rank_id: getHighestRank.id,
        },
      })

      return true
    }),
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
          guilds: {
            is: null,
          },
          guild_membership: {
            is: null,
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
       * This is a function to remove a player from the all invites list
       */
      await prisma.guild_invites.deleteMany({
        where: {
          player_id: input.playerId,
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
      const { name, vocation, level, players_online, account_id } =
        member.players

      return {
        id: member.player_id,
        name,
        vocation,
        level,
        account_id: Number(account_id),
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
