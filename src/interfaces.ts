export interface Todo {
  id: string
  title: string
  date: string
  duration: number
  color: 'red' | 'dark-orange' | 'orange' | 'yellow' | 'green' | 'teal' | 'light-blue' | 'blue' | 'dark-blue' | 'dark-purple' | 'purple' | 'pink' | 'dark-gray' | 'gray' | 'brown'
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