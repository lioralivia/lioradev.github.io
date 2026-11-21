import { describe, it, expect} from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import SnackCard from '../components/SnackCard.vue'

describe('Campus Food Showdown integration', () => {
  it('updates the total after voting for a snack', async() =>{
    const wrapper = mount(App)
    await wrapper.get('.cards button').trigger('click')
    expect(wrapper.text()).toContain("Total Votes: 1")
  })

  it('updates the leaderboard when a snack receives more votes', async() => {
    const wrapper = mount(App)
    await wrapper.get('.cards button').trigger('click')
    expect(wrapper.text()).toContain("🧋 Bubble Tea — 1 vote")
  })
  it('resets votes across cards, total, and status', async() => {
    const wrapperApp = mount(App)
    await wrapperApp.get('.cards button').trigger('click')
    await wrapperApp.get('button').trigger('click')
    const cards = wrapperApp.findAllComponents(SnackCard)

    expect(wrapperApp.text()).toContain("Total Votes: 0")
    expect(wrapperApp.text()).toContain("No votes yet!")
    for (const card of cards) {
      expect(card.text()).toContain('0 votes')
    }
  })
})
