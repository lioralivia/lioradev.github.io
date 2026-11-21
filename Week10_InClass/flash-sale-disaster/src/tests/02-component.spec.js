import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductCard from '../components/ProductCard.vue'
import CartSummary from '../components/CartSummary.vue'
describe('Vue components', () => {
  it('displays the product name', () => {
    const wrapper = mount(ProductCard, { props: { product: { id: 1, name: 'Cat Ear Headphones', price: 50 } } })
    expect(wrapper.text()).toContain('Cat Ear Headphones')
  })
  it('emits add-to-cart when the user clicks Add to Cart', async () => {
    const product = {id: 1, name: 'Cat Ear Headphones', price: 50}
    const wrapper = mount(ProductCard, {props: {product}})
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('add-to-cart')).toEqual(([[product]]))
  })
  it('shows an empty-cart message when there are no items', () => {
    const wrapper = mount(CartSummary, {props: {items : []}})
    expect(wrapper.text()).toContain('Your cart is empty')
  })
})
