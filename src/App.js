import React, {useState, useEffect} from "react"
import { LiveView } from "hypertrack-views-react"
import {Layout, Input, Row, Col, Select, Typography, Form, Checkbox, Result} from "antd"
import SyntaxHighlighter from "react-syntax-highlighter"
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs"

import "./App.css";

function App(){
  const PUBLISHABLE_KEY = "Zw37TcBJ2zVBrOm7eEFXq3hGkebNierEYtHhq_2g9BVQy3Yi72Ijj9ji6Juy6nmZX7igdRm1YdGgGPLJOzyrBw"

  const [tooltip, setTooltip] = useState(true)
  const [deviceList, setDeviceList] = useState(true)
  const [deviceCard, setDeviceCard] = useState(true)
  const [publishableKey, setPublishableKey] = useState(PUBLISHABLE_KEY)
  const [defaultLayer, setDefaultLayer] = useState("base")
  const [deviceId, setDeviceId] = useState("")
  const [customLayerUrl, setCustomLayerUrl] = useState("")
  const [assetsUrl, setAssetsUrl] = useState("")
  const [code, setCode] = useState(`import { LiveView } from "hypertrack-views-react";\n\n<LiveView\n\tpublishableKey="${PUBLISHABLE_KEY}"\n/>`)

  useEffect(() => {
    updateCode()
  }, [tooltip, deviceList, deviceCard, publishableKey, defaultLayer, deviceId, customLayerUrl, assetsUrl])
  
  function setTooltipFunction() {
    setTooltip(!tooltip)
  }

  function setDeviceListFunction(){
    setDeviceList(!deviceList)
  }

  function setDeviceCardFunction(){
    setDeviceCard(!deviceCard)
  }
  
  function setPublishableKeyFunction(event){
    setPublishableKey(event.target.value)
  }

  function setDefaultLayerFunction(inputLayer){
    setDefaultLayer(inputLayer)
  }

  function setDeviceIdFunction(event){
    setDeviceId(event.target.value)
  }

  function setCustomLayerUrlFunction(event){
    setCustomLayerUrl(event.target.value)
  }

  function setAssetsUrlFunction(event){
    setAssetsUrl(event.target.value)
  }

  function updateCode() {
    let code = `import { LiveView } from "hypertrack-views-react";\n\n<LiveView \n\tpublishableKey="${publishableKey}"\n`

    if (!tooltip) {
      code += `\tshowTooltips={${tooltip}}\n`
    }

    if (!deviceList) {
      code += `\tshowDeviceList={${deviceList}}\n`
    }

    if (!deviceCard) {
      code += `\tshowDeviceCard={${deviceCard}}\n`
    }

    if (deviceId !== "") {
      code += `\tselectedDeviceId="${deviceId}"\n`
    }

    if (defaultLayer !== "base") {
      code += `\tdefaultLayer="${defaultLayer}"\n`
    }

    if (customLayerUrl !== "") {
      code += `\tcustomLayerUrl="${customLayerUrl}"\n`
    }

    if (assetsUrl !== "") {
      code += `\tassetsUrl="${assetsUrl}"\n`
    }

    code += `/>`

    setCode(code)
  }

  const { Content } = Layout
  const { Option } = Select
  const { Title } = Typography

  const layerOptions = ["base", "street", "satellite", "custom"]

  console.log("code", code)

  return(
    <div className="App">
        <Layout>
          <Content>
            <Row style={{ padding: "25px" }}>
              <Col span={16} offset={8}>
                <Title>HyperTrack Views ReactJS</Title>
              </Col>
            </Row>
            <Row style={{ padding: "25px" }}>
              <Col span={20} offset={2}>
                {publishableKey === "" && (
                  <Result
                    style={{ height: "300px" }}
                    title="Please set your publishable key"
                    subTitle={
                      <a
                        href="https://dashboard.hypertrack.com/setup"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Get it from the HyperTrack Dashboard
                      </a>
                    }
                  />
                )}
                {/* {publishableKey !== "" && (
                  <LiveView
                    publishableKey={publishableKey}
                    showTooltips={tooltip}
                    showDeviceList={deviceList}
                    selectedDeviceId={deviceId}
                    defaultLayer={defaultLayer}
                    customLayerUrl={customLayerUrl}
                    className="liveView"
                    assetsUrl={assetsUrl}
                  />
                )} */}
              </Col>
            </Row>
            <Row style={{ padding: "25px" }}>
              <Col span={9} offset={2}>
                <Form layout="vertical">
                  <Form.Item label="View Options">
                    <Checkbox
                      checked={tooltip}
                      onChange={() => setTooltipFunction()}
                    >
                      Show tooltips
                    </Checkbox>
                    <Checkbox
                      checked={deviceList}
                      onChange={() => setDeviceListFunction()}
                    >
                      Show device list
                    </Checkbox>
                    <Checkbox
                      checked={deviceCard}
                      onChange={() => setDeviceCardFunction()}
                    >
                      Show device card
                    </Checkbox>
                  </Form.Item>
                  <Form.Item label="Publishable Key">
                    <Input
                      id="publishableKeyInput"
                      placeholder="Your Publishable Key"
                      value={publishableKey}
                      onChange={e => setPublishableKeyFunction(e)}
                    />
                  </Form.Item>
                  <Form.Item label="Device ID">
                    <Input
                      placeholder="Your Device ID"
                      value={deviceId}
                      onChange={e => setDeviceIdFunction(e)}
                    />
                  </Form.Item>
                  <Form.Item label="Custom Layer URL">
                    <Input
                      placeholder="Your Custom Layer URL"
                      value={customLayerUrl}
                      onChange={e => setCustomLayerUrlFunction(e)}
                    />
                  </Form.Item>
                  <Form.Item label="Asset URL">
                    <Input
                      placeholder="Your Assets URL"
                      value={assetsUrl}
                      onChange={e => setAssetsUrlFunction(e)}
                    />
                  </Form.Item>
                  <Form.Item label="Default Layer">
                    <Select
                      defaultValue={defaultLayer}
                      onChange={e => setDefaultLayerFunction(e)}
                    >
                      {layerOptions.map(layer => (
                        <Option key={layer}>{layer}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
              <Col span={9} offset={2}>
                <SyntaxHighlighter
                  wrapLines={true}
                  language="javascript"
                  style={docco}
                >
                  {code}
                </SyntaxHighlighter>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
  )
}

export default App;