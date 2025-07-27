import { TaskstatusFilterEnum } from '@/modules/tasks/enums/TaskStatusFilterEnum'
import { MenuItem, Paper, Select, Typography } from '@mui/material'

type Props = {
  onFilterChange: (filter: TaskstatusFilterEnum) => void
  filter: TaskstatusFilterEnum
}

export default function TaskFilter({ onFilterChange, filter }: Props) {

  const handleFilterChange = (newFilter: TaskstatusFilterEnum) => {
    onFilterChange(newFilter)
  }


  return (
    <Paper className='m-2 w-full max-w-[600px] p-2 gap-2 flex flex-row justify-start items-center'>
        <Typography className='shrink-0' variant='subtitle1'>Filter by status:</Typography>
      <Select
        value={filter}
        onChange={(e) => handleFilterChange(e.target.value)}
        fullWidth
        size='small'
      >
        <MenuItem value={TaskstatusFilterEnum.ALL}>All</MenuItem>
        <MenuItem value={TaskstatusFilterEnum.PENDING}>In Progress</MenuItem>
        <MenuItem value={TaskstatusFilterEnum.COMPLETED}>Done</MenuItem>
      </Select>
    </Paper>
  )
}