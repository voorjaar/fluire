export interface Todo {
  id: string
  title: string
  date: string
  duration: number
  color: 'pink' | 'rose' | 'red' | 'orange' | 'yellow' | 'lime' | 'green' | 'teal' | 'cyan' | 'blue' | 'indigo' | 'purple'
  finished: boolean
}

export interface NavItem {
  id?: string
  name: string
  icon: string
}

export interface Nav {
  title: string
  children: NavItem[]
}