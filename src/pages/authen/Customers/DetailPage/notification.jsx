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
    count = 20;
    const { match, getNotification, detail, log, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getNotification(
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
    const { match, getNotification, location } = this.props
    const { limit, sort, isAsc } = queryString.parse(location.search)
    getNotification(
      match.params.cn, undefined, limit
    )
    this.setState({
      current: page,
      keyword,
    })
  }
  onLoadMore = (increase) => {
    const { match, getNotification, location, log } = this.props
    this.setState({
      loading: true,
    });
    count += increase
    getNotification(
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
    const { type, history, notifications } = this.props
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
          <Button onClick={()=>this.onLoadMore(20)}>loading more</Button>
        </div>
      ) : null;

    return (
      <div className='observer-log-page'>
        <div className='text-right'>
          <Button onClick={() => this.onLoadMore(0)}>Refresh</Button>
        </div>
        <List
          className='demo-loadmore-list'
          loading={initLoading}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={notifications}
          renderItem={item => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={
                    <Avatar src={helper.detectTemplate(item.TemplateName)} />
                  }
                title={<a href='#'>{item.descriptionVN}</a>}
                  description={item.Description}
                />
          <div><TimeAgo date={new Date(item.DateTime)} /></div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    )
  }
}

export default ListPage
