type JokeType = 'programming' | 'general' | string

export interface Joke {
  id: number
  type: JokeType
  setup: string
  punchline: string
}

export interface ExtendedJoke extends Joke {
  saved?: boolean
  visiblePunchline?: boolean
}
