import { describe, it, expect } from 'vitest'
import { getTotalVotes, rankSnacks, addVote, clearVotes } from '../lib/voting.js'

const snacks = [
  { id: 1, name: 'Bubble Tea', votes: 1 },
  { id: 2, name: 'Pizza', votes: 3 },
  { id: 3, name: 'Fries', votes: 2 }
]

describe('Voting utility functions', () => {
  it('calculates the total number of votes', () => {
    const total = getTotalVotes(snacks)
    expect(total).toBe(6)
  })

  it('returns zero for an empty list', () => {
    const total = getTotalVotes([])
    expect(total).toBe(0)
  })
  it('ranks snacks without changing the original list', () => {
    const rankedlist = rankSnacks(snacks)
    expect(rankedlist).not.toBe(snacks)
  })
  it('adds a vote only to the selected snack', () => {
    const updated = addVote(snacks, 1)

    expect(updated).toEqual([
      { id: 1, name: 'Bubble Tea', votes: 2 },
      { id: 2, name: 'Pizza', votes: 3 },
      { id: 3, name: 'Fries', votes: 2 }
    ])
  })
  it('resets all vote counts to zero', () => {
    const result = clearVotes(snacks)
    result.forEach((snack) => {
      expect (snack.votes).toBe(0)
    })
  })
})
