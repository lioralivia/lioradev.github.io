import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SnackCard from '../components/SnackCard.vue'
import Leaderboard from '../components/Leaderboard.vue'

describe('SnackCard', () => {
  it('displays the snack name and vote count', () => {
    const wrapper = mount(SnackCard, {props: { snack : {id: 1, name: 'Bubble Tea', emoji: '🧋', votes: 0 }}})
    expect(wrapper.text()).toContain("Bubble Tea")
    expect(wrapper.text()).toContain(0)
  })
  it('emits a vote event with the snack ID', async () => {
    const wrapper = mount(SnackCard, {props: { snack : {id: 1, name: 'Bubble Tea', emoji: '🧋', votes: 0 }}})
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('vote')).toEqual([[1]])
  })
})

describe('Leaderboard', () => {
  it('displays snacks in the order provided', () => {
    const rankedSnacks = [{ id: 1, name: 'Bubble Tea', emoji: '🧋', votes: 1 },
  { id: 2, name: 'Pizza', emoji: '🍕', votes: 0 }]
    const wrapper = mount(Leaderboard, {props: {rankedSnacks}})
    expect(wrapper.text()).toContain("Bubble Tea")
    expect(wrapper.text()).toContain("Pizza")
  })
  it('shows plural votes correctly', () => {
    const rankedSnacks = [{ id: 1, name: 'Bubble Tea', emoji: '🧋', votes: 2 },
  { id: 2, name: 'Pizza', emoji: '🍕', votes: 1 }]
    const wrapper = mount(Leaderboard, {props: {rankedSnacks}})
    expect(wrapper.text()).toContain("2 votes")
    expect(wrapper.text()).toContain("1 vote")
  })
})
