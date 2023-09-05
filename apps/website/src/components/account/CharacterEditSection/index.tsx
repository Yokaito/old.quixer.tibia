import { Container } from '@/components/ui'
import InnerContainer from '@/components/ui/Container/Inner'
import type { players, worlds } from '@prisma/client'
import { CharacterEditForm } from './form'

type Player = players & {
  worlds: Pick<worlds, 'name'>
}

type Props = {
  player: Player
}

export const CharacterEditSection = async ({ player }: Props) => {
  const tdClass =
    'py-[2px] px-[2px] border-b border-r border-quintenary text-sm text-secondary'

  return (
    <>
      <Container title="Character Data">
        <InnerContainer hasPadding={false} className="p-0">
          <table className="w-full border-collapse">
            <tbody>
              <tr>
                <td className={`${tdClass} font-bold w-[25%] xl:w-[15%]`}>
                  Name:
                </td>
                <td className={`${tdClass} pl-1`}>{player.name}</td>
              </tr>
              <tr>
                <td className={`${tdClass} font-bold w-[25%] xl:w-[15%]`}>
                  World:
                </td>
                <td className={`${tdClass} pl-1`}>{player.worlds.name}</td>
              </tr>
              <tr>
                <td
                  className={`${tdClass}  border-b-0 font-bold w-[25%] xl:w-[15%]`}
                >
                  Sex:
                </td>
                <td className={`${tdClass} pl-1 last:border-b-0 capitalize`}>
                  {player.sex === 1 ? 'male' : 'female'}
                </td>
              </tr>
            </tbody>
          </table>
        </InnerContainer>
      </Container>
      <Container title="Edit Character Information">
        <CharacterEditForm
          id={player.id}
          ishidden={player.ishidden}
          comment={player.comment ?? ''}
        />
      </Container>
    </>
  )
}

export default CharacterEditSection
