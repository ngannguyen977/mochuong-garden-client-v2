import React from 'react'
import { Pagination, Input, List, Avatar, Button, Skeleton } from 'antd'
import { mapStateToProps, mapDispathToProps } from '../container'
import { connect } from 'react-redux'
import queryString from 'query-string'
import LockScreenPage from '../../../DefaultPages/LockscreenPage/Lockscreen'
import '../../../../resources/style.scss'
import '../style.scss'
import ThingCard from '../../../components/ThingCard'
import TimeAgo from "react-timeago"
import helper from '../../../../helper'

const Search = Input.Search
let count = 20;
@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  state = {
    current: 0,
    keyword: '',
    tags: [],
    initLoading: true,
    loading: false,
  }
  UNSAFE_componentWillMount() {
    const { match, getLog, detail, log, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getLog(
      match.params.cn, undefined, limit
    )
    setTimeout(() => {
      this.setState({
        initLoading: false,
      });
    }, 1000);
  }
  UNSAFE_componentWillReceiveProps() {
    const { totalItems } = this.props
    const { pagination } = this.state
    if (totalItems > 0 && pagination !== totalItems) {
      this.setState({
        pagination: {
          total: totalItems,
        },
      })
    }
  }
  onChange = (page, keyword) => {
    const { match, getLog, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getLog(
      match.params.cn, undefined, limit
    )
    this.setState({
      current: page,
      keyword,
    })
  }
  onLoadMore = () => {
    const { match, getLog, location, log } = this.props
    this.setState({
      loading: true,
    });
    count += 10
    getLog(
      match.params.cn, undefined, count
    )
    setTimeout(() => {
      this.setState(
        {
          loading: false,
        },
        () => {
          // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        },
      );
    }, 1000);
  };
  render() {
    const { type, history, log } = this.props
    const { initLoading, loading } = this.state;


    const loadMore =
      !initLoading && !loading ? (
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={this.onLoadMore}>loading more</Button>
        </div>
      ) : null;

      var date = new Date(1579970737*1000)
    console.log('list', date)
    return (
      <div className='observer-log-page'>
        <List
          className='demo-loadmore-list'
          loading={initLoading}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={log}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={helper.detectTemplate(item.TemplateName)} />
                  }
                title={<a href='#'>{item.thingDisplayName} - {item.propertyName}</a>}
                  description={item.value}
                />
          <div><TimeAgo date={new Date(item.time*1000)} /></div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ListPage
