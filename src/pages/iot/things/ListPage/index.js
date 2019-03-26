import React from "react"
import { Pagination, Button, Input, Tag } from "antd"
import { mapStateToProps, mapDispathToProps } from "../container"
import { connect } from "react-redux"
import queryString from "query-string"
import LockScreenPage from "../../../DefaultPages/LockscreenPage/Lockscreen"
import helper from "../../../../helper"
import "../../../../resources/style.scss"
import "../style.scss"
import ThingCard from "../../../components/ThingCard"
import Quagga from 'quagga'

const Search = Input.Search

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
  componentWillMount() {
    const { keyword, limit, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getListByGraphQL(keyword, limit, 0, sort, isAsc)
  }
  componentWillReceiveProps() {
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
    const { limit, sort, isAsc } = queryString.parse(this.props.location.search)
    this.props.getListByGraphQL(keyword, limit, 0, sort, isAsc)
    this.setState({
      current: page,
    })
  }
  componentDidMount(){
    Quagga.init({
      inputStream : {
        name : "Live",
        type : "LiveStream",
        target: document.querySelector('#scanner')    // Or '#yourElement' (optional)
      },
      decoder : {
        readers : ["code_128_reader"]
      }
    }, function(err) {
        if (err) {
            console.log(err);
            return
        }
        console.log("Initialization finished. Ready to start");
        Quagga.start();
    });
  }
scan = ()=>{
  ScanditSDK.configure("xxx", {
    engineLocation: "https://unpkg.com/scandit-sdk/build/"
        }).then(() => {
          console.log('Loaded');
          ScanditSDK.BarcodePicker.create(document.getElementById('barcode-picker'), {
            playSoundOnScan: true,
            vibrateOnScan: true
          }).then(function(barcodePicker) {
            console.log("Ready");
            barcodePicker.applyScanSettings(new ScanditSDK.ScanSettings({
              enabledSymbologies: ["ean8", "ean13", "upca", "upce", "code128", "code39", "code93", "itf", "qr"],
              codeDuplicateFilter: 1000
            }));
            barcodePicker.onScan(function(barcodes) {
              console.log(barcodes);
            });
          });
        });
}
  render() {
    const { totalItems, destroy, data, type, history } = this.props

    return (
      <div className='thing'>
        <section className='card'>
          <div className='card-header'>
            <div className='row'>
              <div className='col-md-10'>
                <div className='utils__title'>
                  <strong>Things Management</strong>
                </div>
                <div id='scanner'></div>
                <small>
                  Thing management allow admins can control all things. Administrators can create a
                  new thing, add a thing to several groups, attach some permission, change status or
                  delete things. You also view detail a thing, identify groups and permissions of a
                  thing.
                </small>
              </div>
              <div className='col-md-2 thing__btn-create'>
                <Button type='primary' onClick={() => history.push("/things/register")}>
                  Register Thing
                </Button>
              </div>
            </div>
          </div>
          <div className='card-body'>
            <div className='operation-box'>
              <div className='search-box'>
                <Search
                  placeholder='input search text'
                  onSearch={value => this.onChange(this.state.current, value)}
                  // onBlur={value => this.onChange(this.state.current, value)}
                  style={{ width: 600 }}
                />
              </div>
              <div className='text-right' style={{ marginBottom: 10 }}>
                <Pagination
                  current={this.state.current}
                  onChange={page => this.onChange(page, this.state.keyword)}
                  total={totalItems}
                  pageSize={18}
                />
              </div>
            </div>
            {totalItems > 0 && (
              <div className='row'>
                {data &&
                  data.map(x => (
                    <div className='col-md-2' key={x.name}>
                      <ThingCard
                        data={x || {}}
                        type={type}
                        onMouseEnter={() => this.setState({ current: 0 })}
                        remove={destroy}
                        push={history.push}
                      />
                    </div>
                  ))}
                <div className='col-md-12 text-right'>
                  <Pagination
                    current={this.state.current}
                    onChange={this.onChange}
                    total={totalItems}
                    pageSize={18}
                  />
                </div>
              </div>
            )}
            {totalItems <= 0 && <LockScreenPage name='Thing' link='#/things/register' />}
          </div>
        </section>
      </div>
    )
  }
}

export default ListPage
