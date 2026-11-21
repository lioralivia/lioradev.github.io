import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'
describe('Shopping cart integration', () => {
  it('updates the cart when Add to Cart is clicked', async() => {
    const wrapper = mount(App)
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('Cat Ear Headphones x 1')
    expect(wrapper.get('[data-testid="total"]').text()).toContain('$50.00')
  })
  it('increases quantity and total after two clicks', async () => {
    const wrapper = mount(App)
    await wrapper.get('button').trigger('click')
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toContain('Cat Ear Headphones x 2')
    expect(wrapper.get('[data-testid="total"]').text()).toContain('$100.00')
  })
})
