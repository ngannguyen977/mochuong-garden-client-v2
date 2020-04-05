import React from "react"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux"
// styling
import "../../../resources/style.scss"
import "../style.scss"


@connect(
  mapStateToProps,
  mapDispathToProps,
)
class ListPage extends React.Component {
  state = {
    current: 0,
    keyword: "",
    tags: [],
  }
  componentDidMount() {
    this.props.list()
  }

  render() {
    const { data } = this.props
    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
            <div className='row'>
              header
            </div>
          </div>
          <div className='card-body'>
            <div className='row'>
              {data &&
                data.map(x => (
                  <div className='col-md-2' key={x.name}>
                    {x.name}
                  </div>
                ))}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
