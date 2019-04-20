/* eslint-disable react/forbid-prop-types */
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import debounce from 'lodash.debounce'
import './index.scss'

export default class List extends PureComponent {
  static defaultProps = {
    ListHeaderComponent: () => {},
    ListFooterComponent: () => {},
    ListEmptyComponent: () => {},
    ItemSeparatorWidth: 1,
    ItemSeparatorColor: '#e8e8e8',
    ItemClassName: '',
    style: {},
    onEndReached: () => {},
    onEndReachedThreshold: 100,
  }

  static propTypes = {
    renderItem: PropTypes.func.isRequired,
    keyExtractor: PropTypes.func.isRequired,
    onEndReached: PropTypes.func,
    data: PropTypes.array.isRequired,
    style: PropTypes.object,
    ItemSeparatorWidth: PropTypes.number,
    onEndReachedThreshold: PropTypes.number,
    ItemClassName: PropTypes.string,
    ItemSeparatorColor: PropTypes.string,
    ListHeaderComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    ListFooterComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    ListEmptyComponent: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }

  constructor(props) {
    super(props)
    this.onEndReachedComponent = debounce(this.onEndReachedComponent, 500, { leading: true, trailing: false })
  }

  componentDidMount() {
    this.bindOnScroll()
  }

  bindOnScroll = () => {
    this.list.onscroll = () => {
      try {
        const { onEndReached, onEndReachedThreshold } = this.props
        //文档内容实际高度（包括超出视窗的溢出部分）
        const { scrollHeight } = this.list;
        //滚动条滚动距离
        const scrollTop = this.list.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
        //窗口可视范围高度
        const clientHeight = this.list.innerHeight || Math.min(this.list.clientHeight, document.body.clientHeight);
        if (clientHeight + scrollTop >= scrollHeight - onEndReachedThreshold) {
          this.onEndReachedComponent()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }

  onEndReachedComponent = () => {
    const { onEndReached } = this.props
    onEndReached()
  }

  renderHeader = () => {
    const { ListHeaderComponent } = this.props
    if (typeof ListHeaderComponent === 'object') {
      return ListHeaderComponent
    }
    return ListHeaderComponent()
  }

  renderFooter = () => {
    const { ListFooterComponent } = this.props
    if (typeof ListFooterComponent === 'object') {
      return ListFooterComponent
    }
    return ListFooterComponent()
  }

  renderEmpty = () => {
    const { ListEmptyComponent } = this.props
    if (typeof ListEmptyComponent === 'object') {
      return ListEmptyComponent
    }
    return ListEmptyComponent()
  }

  renderItemComponent = (item, index) => {
    const { data, ItemSeparatorWidth, ItemSeparatorColor, renderItem, keyExtractor, ItemClassName } = this.props
    const isLastItem = index === data.length - 1
    return (
      <li
        key={keyExtractor(item, index)}
        style={!isLastItem ? { borderBottom: `${ItemSeparatorWidth}px solid ${ItemSeparatorColor}` } : null}
        className={ItemClassName}
      >
        {renderItem(item, index)}
      </li>
    )
  }

  renderList = () => {
    const { data } = this.props
    if (!data.length) {
      return this.renderEmpty()
    }
    return (
      <ul>
        {data.map(this.renderItemComponent)}
      </ul>
    )
  }

  render() {
    const { style } = this.props
    return (
      <div className='listWrap' style={style}>
        <div className='listContainer' ref={c => { this.list = c }}>
          {this.renderHeader()}
          {this.renderList()}
          {this.renderFooter()}
        </div>
      </div>
    )
  }
}