type JokeType = 'programming' | 'general'

export interface Joke {
  id: number
  type: JokeType
  setup: string
  punchline: string
}
