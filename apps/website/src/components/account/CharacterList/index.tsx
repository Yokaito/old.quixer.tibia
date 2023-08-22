import styles from './list.module.scss'

export const AccountCharacterList = () => {
  return (
    <div className={`${styles.qxCharacterList}`}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Nome</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="15px">1.</td>
            <td width="50%">
              <p>[GM] Kamity</p>
              <p>GameMaster - Level 999 - Quixer</p>
            </td>
            <td>Reward</td>
            <td>X</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default AccountCharacterList
