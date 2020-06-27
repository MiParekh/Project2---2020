// Import react-vis
import { Sunburst } from 'react-vis';

import {Hint, Sunburst} from 'index';

import {EXTENDED_DISCRETE_COLOR_RANGE as COLORS} from 'theme';

//Link from Flask to JS file
var characters = "/characters"

d3.json(characters, function (data) {
    console.log(data)

})

    //Add the following code to your render function:
    //< Sunburst
hideRootNode
colorType = "literal"
data = {data}
height = {300}
width = {350};

//>

  //Like other systems that make use of d3's hierarchy layout system 
  //we ask that our data be presented to us in a tree like structure.

  const myData = {
    "title": "analytics",
    "color": "#12939A",
    "children": [
        {
            "title": "cluster",
            "children": [
                { "title": "AgglomerativeCluster", "color": "#12939A", "size": 3938 },
                { "title": "CommunityStructure", "color": "#12939A", "size": 3812 },
                { "title": "HierarchicalCluster", "color": "#12939A", "size": 6714 },
                { "title": "MergeEdge", "color": "#12939A", "size": 743 }
            ]
        },
        {
            "title": "graph",
            "children": [
                { "title": "BetweennessCentrality", "color": "#12939A", "size": 3534 },
                { "title": "LinkDistance", "color": "#12939A", "size": 5731 },
                { "title": "MaxFlowMinCut", "color": "#12939A", "size": 7840 },
                { "title": "ShortestPaths", "color": "#12939A", "size": 5914 },
                { "title": "SpanningTree", "color": "#12939A", "size": 3416 }
            ]
        },
        {
            "title": "optimization",
            "children": [
                { "title": "AspectRatioBanker", "color": "#12939A", "size": 7074 }
            ]
        }
    ]
};

//Adding annotations
const tipStyle = {
    display: 'flex',
    color: '#fff',
    background: '#000',
    alignItems: 'center',
    padding: '5px'
  };
  const boxStyle = {height: '10px', width: '10px'};
  
  function buildValue(hoveredCell) {
    const {radius, angle, angle0} = hoveredCell;
    const truedAngle = (angle + angle0) / 2;
    return {
      x: radius * Math.cos(truedAngle),
      y: radius * Math.sin(truedAngle)
    };
  }
  
  export default class SunburstWithTooltips extends React.Component {
    state = {
      hoveredCell: false
    };
    render() {
      const {hoveredCell} = this.state;
      return (
        <Sunburst
          data={DATA}
          style={{stroke: '#fff'}}
          onValueMouseOver={v =>
            this.setState({hoveredCell: v.x && v.y ? v : false})
          }
          onValueMouseOut={v => this.setState({hoveredCell: false})}
          height={300}
          margin={{top: 50, bottom: 50, left: 50, right: 50}}
          getLabel={d => d.name}
          getSize={d => d.bigness}
          getColor={d => d.clr}
          width={350}
          padAngle={() => 0.02}
        >
          {hoveredCell ? (
            <Hint value={buildValue(hoveredCell)}>
              <div style={tipStyle}>
                <div style={{...boxStyle, background: hoveredCell.clr}} />
                {hoveredCell.clr}
              </div>
            </Hint>
          ) : null}
        </Sunburst>
      );
    }
  }