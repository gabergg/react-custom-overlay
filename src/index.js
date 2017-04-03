import React from 'react';
import ReactDOM from 'react-dom';

export default function getCustomMarker() {
  class CustomMarker extends window.google.maps.OverlayView {
    constructor({position, map, component, props}) {
      super();
      this.position = position;
      this.component = component;
      this.props = props;

      this.setMap(map);
    }

    _createDiv() {
      this.div = document.createElement('div');

      const panes = this.getPanes();
      panes.overlayImage.appendChild(this.div);
    }

    _renderMarkerElement() {
      if (!this.div) {
        this._createDiv();
      }

      const pixelPosition = this.getProjection().fromLatLngToDivPixel(this.position);
      const markerElement = React.createElement(this.component, {
        ...this.props,
        pixelPosition,
      });
      ReactDOM.render(markerElement, this.div);
    }

    draw() {
      this._renderMarkerElement();
    }

    getPosition() {
      return this.position;
    }

    remove() {
      if (this.div) {
        ReactDOM.unmountComponentAtNode(this.div);
      }
    }

    updateMarker(props) {
      this.props = props;
      this._renderMarkerElement();
    }

  }
  return CustomMarker;
}
