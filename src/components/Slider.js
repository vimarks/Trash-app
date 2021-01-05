import React, { Component } from "react";

import BeforeAfterSlider from "react-before-after-slider";

export default class Slider extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const before = this.props.beforeURL;
    const after = this.props.afterURL;

    return (
      <BeforeAfterSlider
        before={before}
        after={after}
        width={390}
        height={330}
      />
    );
  }
}
