import React from 'react';
import ReactDOM from 'react-dom';
import SyntaxHighlighter from 'react-syntax-highlighter/prism';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/styles/prism';
import { Collapse, Icon } from 'antd';

import { default as renderCollapseAccordion } from './Accordion/index.js';
import { default as renderCollapseBasic } from './Basic/index.js';
import { default as renderCollapseBorderless } from './Borderless/index.js';
import { default as renderCollapseCustom } from './Custom/index.js';
import { default as renderCollapseMix } from './Mix/index.js';
import { default as renderCollapseNoarrow } from './Noarrow/index.js';


const Panel = Collapse.Panel;


class CollapseItems extends React.Component {

  componentDidMount() {
    renderCollapseAccordion(ReactDOM, document.getElementById("CollapseAccordion"));
renderCollapseBasic(ReactDOM, document.getElementById("CollapseBasic"));
renderCollapseBorderless(ReactDOM, document.getElementById("CollapseBorderless"));
renderCollapseCustom(ReactDOM, document.getElementById("CollapseCustom"));
renderCollapseMix(ReactDOM, document.getElementById("CollapseMix"));
renderCollapseNoarrow(ReactDOM, document.getElementById("CollapseNoarrow"));

  }

  render() {
    return (
      <div className="CollapseDemo">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <h5 className="mb-0 mr-3 d-inline-block text-black">
                  <strong>Collapse</strong>
                </h5>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="card" id="components-collapse-demo-accordion">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">Accordion</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div>Accordion mode, only one panel can be expanded at a time. The first panel will be expanded by default.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;

ReactDOM.render(
  <Collapse accordion>
    <Panel header="This is panel header 1" key="1">
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>\{text\}</p>
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseAccordion" />
  </div>
</div>
<div className="card" id="components-collapse-demo-borderless">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">Borderless</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div>A borderless style of Collapse.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

const text = (
  <p style=\{\{ paddingLeft\: 24 \}\}>
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.
  </p>
);

ReactDOM.render(
  <Collapse bordered=\{false\} defaultActiveKey=\{['1']\}>
    <Panel header="This is panel header 1" key="1">
      \{text\}
    </Panel>
    <Panel header="This is panel header 2" key="2">
      \{text\}
    </Panel>
    <Panel header="This is panel header 3" key="3">
      \{text\}
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseBorderless" />
  </div>
</div>
<div className="card" id="components-collapse-demo-mix">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">Nested panel</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div><code>{'Collapse'}</code> is nested inside the <code>{'Collapse'}</code>.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

function callback(key) \{
  console.log(key);
\}

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;

ReactDOM.render(
  <Collapse onChange=\{callback\}>
    <Panel header="This is panel header 1" key="1">
      <Collapse defaultActiveKey="1">
        <Panel header="This is panel nest panel" key="1">
          <p>\{text\}</p>
        </Panel>
      </Collapse>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3">
      <p>\{text\}</p>
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseMix" />
  </div>
</div>

                  </div>
                  <div className="col-lg-6">
                    <div className="card" id="components-collapse-demo-basic">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">Collapse</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div>More than one panel can be expanded at a time, the first panel is initialized to be active in this case.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

function callback(key) \{
  console.log(key);
\}

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;

ReactDOM.render(
  <Collapse defaultActiveKey=\{['1']\} onChange=\{callback\}>
    <Panel header="This is panel header 1" key="1">
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2">
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" disabled>
      <p>\{text\}</p>
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseBasic" />
  </div>
</div>
<div className="card" id="components-collapse-demo-custom">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">Custom Panel</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div>Customize the background, border and margin styles for each panel.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;

const customPanelStyle = \{
  background\: '#f7f7f7',
  borderRadius\: 4,
  marginBottom\: 24,
  border\: 0,
  overflow\: 'hidden',
\};

ReactDOM.render(
  <Collapse bordered=\{false\} defaultActiveKey=\{['1']\}>
    <Panel header="This is panel header 1" key="1" style=\{customPanelStyle\}>
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 2" key="2" style=\{customPanelStyle\}>
      <p>\{text\}</p>
    </Panel>
    <Panel header="This is panel header 3" key="3" style=\{customPanelStyle\}>
      <p>\{text\}</p>
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseCustom" />
  </div>
</div>
<div className="card" id="components-collapse-demo-noarrow">
  <div className="card-header">
    <h5 className="mb-0 mr-3 d-inline-block text-black">
      <strong className="text-capitalize">No arrow</strong>
    </h5>
  </div>
  <div className="cat__ant-component-collapse-descr">
    <Collapse bordered={false} defaultActiveKey={['1']}>
      <Panel header={<span><Icon style={{ fontSize: 16, color: '#9f9f9f' }} type="info-circle-o" /><span className="ml-2 text-primary">Description</span></span>} key="1" showArrow={false}>
        <div>You can disable showing arrow icon by passing <code>{'showArrow={false}'}</code> to <code>{'CollapsePanel'}</code> component.
</div>
      </Panel>
      <Panel header={<span><i className="fa fa-code" style={{ fontSize: 16, color: '#9f9f9f' }}></i><span className="ml-2 text-primary">Show Code</span></span>} key="2" showArrow={false}>
        <SyntaxHighlighter language='jsx' style={base16AteliersulphurpoolLight} useInlineStyles={true}>
          {`import \{ Collapse \} from 'antd';
const Panel = Collapse.Panel;

function callback(key) \{
  console.log(key);
\}

const text = \`
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
\`;

ReactDOM.render(
  <Collapse defaultActiveKey=\{['1']\} onChange=\{callback\}>
    <Panel header="This is panel header with arrow icon" key="1">
      <p>\{text\}</p>
    </Panel>
    <Panel showArrow=\{false\} header="This is panel header with no arrow icon" key="2">
      <p>\{text\}</p>
    </Panel>
  </Collapse>
, mountNode);
`}
        </SyntaxHighlighter>
      </Panel>
    </Collapse>
  </div>
  <div className="card-body">
    <div id="CollapseNoarrow" />
  </div>
</div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CollapseItems
