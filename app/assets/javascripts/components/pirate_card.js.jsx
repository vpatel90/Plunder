var PirateCard = React.createClass ({

  getInitialState: function() {
     return {
       shipUrl: '',
       iconUrl: '',
       flagClass: ''
     };
   },

  componentWillMount: function() {
    var shipUrl = "/assets/P.png";
    var iconUrl = "/assets/P-value.png";
    this.setState({
      shipUrl: shipUrl,
      iconUrl: iconUrl,
      flagClass: this.props.color + '-flag pirate-flag'
    })
  },

  renderFlag: function() {
    return (
      <svg width="254pt" height="151pt" viewBox="0 0 254 151" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path className="inline" fill="#000000" d=" M 0.00 0.18 C 2.34 0.63 4.64 1.29 6.92 1.99 C 89.25 27.39 171.72 52.35 254.00 77.92 L 254.00 78.42 C 175.75 100.96 97.41 123.19 19.13 145.60 C 12.75 147.33 6.46 149.45 0.00 150.87 L 0.00 0.18 Z" />
      <path className="outline" fill="#ffffff" d=" M 49.89 36.84 C 53.53 34.58 58.01 35.70 62.05 35.55 C 69.43 35.71 74.61 43.09 74.77 49.99 C 74.81 53.11 75.00 56.86 72.15 58.90 C 72.05 57.15 71.96 55.40 71.90 53.64 L 71.00 53.68 C 70.92 55.89 70.73 58.09 70.68 60.31 C 71.79 60.70 72.89 61.13 73.96 61.61 C 73.31 66.09 68.25 65.88 65.82 68.78 C 65.09 69.51 64.37 70.25 63.67 71.00 C 60.08 70.98 56.48 71.12 52.89 70.92 C 51.09 69.78 50.02 67.67 47.93 66.94 C 45.36 65.70 41.01 64.84 42.12 60.98 C 42.68 60.78 43.80 60.39 44.35 60.19 C 44.86 54.18 45.66 48.20 48.14 42.64 C 43.71 46.78 43.59 53.35 43.05 58.95 C 40.01 54.16 40.44 47.83 42.81 42.87 C 44.15 39.87 47.25 38.46 49.89 36.84 Z" />
      <path className="inline" fill="#000000" d=" M 48.37 53.60 C 49.65 51.93 51.84 52.06 53.71 51.84 C 55.14 53.56 56.25 55.79 54.94 57.95 C 53.93 60.90 50.57 61.19 47.92 61.11 C 47.31 58.70 46.48 55.66 48.37 53.60 Z" />
      <path className="inline" fill="#000000" d=" M 60.30 56.89 C 59.54 53.95 62.88 50.86 65.75 52.21 C 68.96 53.83 69.75 58.49 67.20 61.05 C 66.37 61.05 64.70 61.04 63.86 61.03 C 62.46 59.88 60.66 58.83 60.30 56.89 Z" />
      <path className="inline" fill="#000000" d=" M 54.97 65.81 C 55.63 63.31 56.43 60.83 57.76 58.60 C 59.19 60.67 59.36 63.19 59.76 65.58 C 58.16 65.61 56.56 65.69 54.97 65.81 Z" />
      <path className="outline" fill="#ffffff" d=" M 46.54 68.71 C 50.89 70.62 49.69 75.97 52.46 79.14 C 52.84 78.51 53.61 77.26 53.99 76.64 C 53.76 77.34 53.31 78.76 53.08 79.46 C 54.16 79.76 56.31 80.35 57.38 80.64 C 57.21 79.48 57.04 78.31 56.88 77.14 C 57.43 77.25 58.54 77.46 59.09 77.56 C 58.77 78.35 57.40 79.91 59.09 80.16 C 62.20 81.47 58.71 76.46 61.93 76.80 C 61.82 77.66 61.59 79.37 61.48 80.23 C 66.39 78.12 63.71 71.29 68.64 69.19 C 67.90 73.52 68.89 78.97 65.27 82.21 C 62.82 85.32 58.38 84.90 54.87 84.55 C 51.67 84.39 49.83 81.42 48.19 79.05 C 45.86 76.11 46.58 72.17 46.54 68.71 Z" />
      <path className="outline" fill="#ffffff" d=" M 25.07 74.05 C 26.12 72.92 27.40 72.04 28.77 71.33 C 31.01 72.20 33.34 73.24 34.56 75.45 C 36.22 78.47 38.94 80.70 41.98 82.24 C 51.17 86.89 59.90 92.36 69.01 97.16 C 75.95 101.11 84.06 102.14 91.90 102.49 C 94.69 102.64 95.55 106.11 94.18 108.17 C 92.85 109.36 90.55 108.81 89.43 110.30 C 88.14 111.55 87.24 113.83 85.07 113.53 C 79.68 113.52 76.81 107.91 72.27 105.77 C 62.16 101.40 53.02 95.10 42.87 90.82 C 35.86 87.61 28.41 85.29 20.78 84.15 C 19.88 82.71 18.27 81.00 19.29 79.21 C 20.26 76.59 23.34 76.01 25.07 74.05 Z" />
      <path className="outline" fill="#ffffff" d=" M 53.27 74.62 C 51.75 74.56 51.77 71.96 53.18 71.72 C 54.77 71.74 54.83 74.49 53.27 74.62 Z" />
      <path className="outline" fill="#ffffff" d=" M 55.18 72.00 C 56.38 73.14 58.01 72.69 59.47 72.49 C 60.80 72.60 62.25 72.35 63.22 73.51 C 61.74 73.71 60.15 73.23 59.04 74.53 L 59.10 72.77 C 57.87 73.90 55.82 73.47 54.85 74.92 C 54.93 74.19 55.10 72.73 55.18 72.00 Z" />
      <path className="outline" fill="#ffffff" d=" M 83.10 75.97 C 84.38 73.78 86.33 72.48 88.97 72.85 C 90.96 75.31 92.88 77.85 95.45 79.75 C 97.57 81.48 97.03 84.53 95.41 86.40 C 85.59 88.98 75.51 90.82 65.98 94.37 C 63.76 93.14 61.55 91.90 59.31 90.71 C 66.89 85.28 77.50 84.09 83.10 75.97 Z" />
      <path className="outline" fill="#ffffff" d=" M 55.09 77.33 C 58.34 77.55 53.58 80.41 55.09 77.33 Z" />
      <path className="inline" fill="#000000" d=" M 26.62 81.74 C 26.76 81.39 27.05 80.70 27.20 80.35 C 29.20 83.05 33.18 82.51 35.48 84.89 C 32.39 84.27 29.47 83.04 26.62 81.74 Z" />
      <path className="inline" fill="#000000" d=" M 88.81 81.89 C 88.80 82.75 88.80 83.62 88.80 84.48 C 86.27 85.11 83.72 85.63 81.15 86.03 L 81.09 85.49 C 83.78 84.68 87.73 85.14 88.81 81.89 Z" />
      <path className="outline" fill="#ffffff" d=" M 27.07 99.73 C 34.65 99.29 42.76 99.24 49.27 94.76 C 51.64 96.06 53.99 97.41 56.29 98.85 C 50.19 101.90 43.48 103.80 37.85 107.73 C 34.81 109.58 31.81 112.50 27.96 111.97 C 25.48 111.85 24.62 109.29 23.43 107.55 C 21.54 106.56 18.43 105.16 19.38 102.48 C 20.17 98.95 24.39 99.86 27.07 99.73 Z" />
      <path className="inline" fill="#000000" d=" M 24.08 101.96 C 25.54 101.50 26.02 101.95 25.51 103.31 C 24.05 103.76 23.57 103.31 24.08 101.96 Z" />
      <path className="inline" fill="#000000" d=" M 28.53 109.23 C 27.77 107.97 27.64 106.48 27.34 105.07 C 28.04 105.99 28.73 106.92 29.38 107.87 C 30.17 107.97 31.74 108.16 32.52 108.26 C 31.35 109.07 29.96 109.51 28.53 109.23 Z" />
      </svg>
    );
  },

  render: function(){

        return (
          <div className="pirate-card styled-pirate-card">

                <span className={this.state.flagClass}> {this.renderFlag()}</span>
                <img src={this.state.shipUrl} className="circle ship-image pirate-on-board" />
                <div><img className="circle portrait-on-board" src={this.props.lead_portrait} />
                <div className="pirate-ship-value"><img src={this.state.iconUrl} />
                  <span>{this.props.sum} </span></div>
                </div>
          </div>
        );

    }

});
