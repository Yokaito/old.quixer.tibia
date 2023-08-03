'use client'

import {
  ChangeSet,
  EditingState,
  IntegratedEditing,
  ViewState,
  AppointmentModel,
  GroupingState,
  IntegratedGrouping,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  DayView,
  WeekView,
  Appointments,
  AppointmentTooltip,
  EditRecurrenceMenu,
  AllDayPanel,
  Toolbar,
  ViewSwitcher,
  DateNavigator,
  TodayButton,
  AppointmentForm,
  ConfirmationDialog,
  DragDropProvider,
  GroupingPanel,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui'
import { useCallback, useEffect, useState } from 'react'

const personals = [
  {
    text: 'Fred',
    id: 1,
  },
  {
    text: 'Maiara',
    id: 2,
  },
]

const owners = [
  {
    text: 'Guilherme Fontes',
    id: 1,
    color: 'indigo',
  },
  {
    text: 'João Pedro',
    id: 2,
    color: 'teal',
  },
  {
    text: 'Aline',
    id: 3,
    color: 'cyan',
  },
]

const schedulerData = [
  {
    startDate: new Date(2023, 7, 2, 8, 30),
    endDate: new Date(2023, 7, 2, 9),
    title: 'Meeting',
    id: 1,
    personal: 1,
    member: 1,
  },
  {
    startDate: new Date(2023, 7, 2, 9, 30),
    endDate: new Date(2023, 7, 2, 10),
    title: 'Go to a gym',
    id: 3,
    personal: 1,
    member: 3,
  },
  {
    startDate: new Date(2023, 7, 2, 14, 30),
    endDate: new Date(2023, 7, 2, 15, 30),
    title: 'Go to a gym',
    id: 2,
    personal: 2,
    member: 2,
  },
]

type ScheduleData = {
  startDate: Date
  endDate: Date
  title: string
  id: number
  personal: number
  member: number
  location?: string
  notes?: string
  allDay?: boolean
}

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [data, setData] = useState<ScheduleData[]>(schedulerData)
  const [members, setMembers] = useState(owners)
  const [personalPerson, setPersonals] = useState(personals)
  const [inputValue, setInputValue] = useState('')

  const handleFilter = useCallback(() => {
    const filteredPersonal = personalPerson.filter((personal) =>
      personal.text.toLowerCase().includes(inputValue.toLowerCase())
    )

    const filteredSchedules = data.filter((appointment) =>
      filteredPersonal.some((personal) => personal.id === appointment.personal)
    )

    const filteredMembersOfPersonalConnectedWithSchedules = members.filter(
      (member) =>
        filteredSchedules.some(
          (appointment) => appointment.member === member.id
        )
    )

    if (filteredPersonal.length === 0) {
      return
    }

    setMembers(filteredMembersOfPersonalConnectedWithSchedules)
    setData(filteredSchedules)
    setPersonals(filteredPersonal)
  }, [personalPerson, inputValue, data, members])

  const handleReset = useCallback(() => {
    setMembers(owners)
    setData(schedulerData)
    setPersonals(personals)
  }, [])

  const handleCommitChanges = useCallback(
    ({ deleted, added, changed }: ChangeSet) => {
      if (deleted !== undefined) {
        setData(data.filter((appointment) => appointment.id !== deleted))
      }

      if (added) {
        const generateId = () =>
          Math.max(...data.map((appointment) => appointment.id)) + 1
        setData([...data, { ...added, id: generateId() } as ScheduleData])
      }

      if (changed) {
        setData(
          data.map((appointment) =>
            changed[appointment.id]
              ? { ...appointment, ...changed[appointment.id] }
              : appointment
          )
        )
      }
    },
    [data]
  )

  return (
    <main className="flex flex-col items-center min-h-screen p-24">
      <div>
        <input
          type="text"
          className="w-full bg-slate-300"
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <Scheduler data={data} height={600}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <EditingState
          onCommitChanges={(changes) => handleCommitChanges(changes)}
        />
        <GroupingState
          grouping={[
            {
              resourceName: 'personal',
            },
            {
              resourceName: 'member',
            },
          ]}
        />

        <DayView startDayHour={7} endDayHour={20} />
        <WeekView startDayHour={7} endDayHour={20} />
        <Appointments />
        <Resources
          data={[
            {
              fieldName: 'member',
              title: 'Members',
              instances: members,
              allowMultiple: false,
            },
            {
              fieldName: 'personal',
              title: 'Personal',
              instances: personalPerson,
              allowMultiple: false,
            },
          ]}
          mainResourceName="member"
        />

        <IntegratedGrouping />
        <IntegratedEditing />
        <AllDayPanel />
        <EditRecurrenceMenu />

        <Toolbar />
        <ViewSwitcher />
        <ConfirmationDialog />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />
        <GroupingPanel />
        <DragDropProvider />
      </Scheduler>
    </main>
  )
}
