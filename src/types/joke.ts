export type JokeValidType = 'programming' | 'random'

export interface Joke {
  id: number
  type: string
  setup: string
  punchline: string
}

export interface JokeExtended extends Joke {
  saved?: boolean
  visiblePunchline?: boolean
}
