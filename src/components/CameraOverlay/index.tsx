import React from 'react'
import { Dimensions, View } from 'react-native'
import { useStyles } from 'react-native-unistyles';
import Svg, { Rect, Defs, Mask, Line } from 'react-native-svg';

import { stylesheet } from './styles';

export function CameraOverlay() {
  const { styles } = useStyles(stylesheet)
  const { height, width } = Dimensions.get('window');
  const rectWidth = width * 0.9;
  const rectHeight = 95;
  const borderRadius = 16;
  const viewBox = `0 0 ${width} ${height}`;
  const lineY = (height - rectHeight) / 2 + rectHeight / 2;

  return (
    <View style={styles.container}>
      <Svg
        height={height}
        viewBox={viewBox}
      >
        <Defs>
          <Mask id="mask">
            <Rect height={height} width={width} fill="#fff" />
            <Rect
              x={(width - rectWidth) / 2}
              y={(height - rectHeight) / 2}
              width={rectWidth}
              height={rectHeight}
              rx={borderRadius}
              fill="#000"
            />
          </Mask>
        </Defs>

        <Rect
          height={height}
          width={width}
          fill="#000000B3"
          mask="url(#mask)"
        />

        <Line
          x1={width * 0.125}
          y1={lineY}
          x2={width * 0.875}
          y2={lineY}
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </Svg>
    </View>
  )
}