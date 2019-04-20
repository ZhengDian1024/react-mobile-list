# react-mobile-list

A List with infinite scrolling like RN FlatList without pull-to-refresh for mobile or pc web

## Simple example

```js
const renderItem = (item, index) => <div>{item.name}</div>

<List
  data={dataList}
  renderItem={renderItem}
  keyExtractor={(item, index) => item.id}
  ItemSeparatorWidth={8}
  ItemSeparatorColor='#f7f7f7'
  onEndReached={() => { console.log('end') }}
/>
```
## API and Configuration:

| Property | Type | Default | Description |
|-------------|----------|--------------|----------------------------------------------------------------|
| `data`     | `Array` | [] | Your list data.  |
| `renderItem`     | `Function` | `Required` | `renderItem({ item: Object, index: Number })` Takes an item from data and renders it into the list.|
| `ItemClassName`     | `String` |  | `className` for items.|
| `ItemSeparatorWidth`     | `Number` | 1 | Rendered in between each item, but not at the top or bottom. |
| `ItemSeparatorColor`     | `String` | `#e8e8e8` | borderColor. |
| `ListEmptyComponent`     | `Function Component Element` |  | Rendered when the list is empty. Can be a React Component Class, a render function, or a rendered element. |
| `ListFooterComponent`     | `Function Component Element` |  | Rendered at the bottom of all the items. Can be a React Component Class, a render function, or a rendered element. |
| `ListHeaderComponent`     | `Function Component Element` |  | Rendered at the top of all the items. Can be a React Component Class, a render function, or a rendered element. |
| `keyExtractor`     | `Function` | `Required` | `(item: object, index: number) => string` |
| `onEndReached`     | `Function` |  | Called once when the scroll position gets within `onEndReachedThreshold` of the rendered content. |
| `onEndReachedThreshold`     | `Number` | `100` | How far from the end the bottom edge of the list must be from the end of the content to trigger the `onEndReached` callback. Thus a value of `100` will trigger `onEndReached` when the end of the content is within `100px` visible length of the list.|
## Installation

```npm install react-mobile-list --save```
