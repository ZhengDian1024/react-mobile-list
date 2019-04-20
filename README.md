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
## Installation

```npm install react-mobile-list --save```