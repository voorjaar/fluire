export interface Todo {
  id: string
  title: string
  date: string
  duration: number
  color: 'pink' | 'rose' | 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'cyan' | 'blue' | 'indigo' | 'purple'
  finished: boolean
}