import React from 'react';
import ReactDOM from 'react-dom';
import './profile.css';

class ZipCodeField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value})
  }

  handleBlur() {
    this.setState({touched: true})
  }

  validate(zipCode) {
    return {
      tooShort: zipCode.length < 5
    }
  }

  render() {
    const errors = this.validate(this.state.value)
    const shouldMarkError = (type) => {
      const hasError = errors[type]
      const shouldShow = this.state.touched
      return hasError ? shouldShow : false
    }
    return (
      <div className="field">
        <div className="field-title">{this.props.title}</div>
          <input type="text" name="zip-code" className={shouldMarkError('tooShort') ? "error" : ""} onChange={this.handleChange} onBlur={this.handleBlur}/>
        <div className="field-subtext">{this.props.subtext}</div>
      </div>
    )
  }
}

class DropdownField extends React.Component {
  constructor(props) {
      super(props)
      this.state = {value: props.default}
      this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
   this.setState({value: event.target.value})
  }

  createOptions() {
    let options = []
    for (const value in this.props.options) {
      options.push(<option value={value}>{this.props.options[value]}</option>)
    }
    return options
  }

  render() {
    return (
      <div className="field">
        <div className="field-title">{this.props.title}</div>
        <select value={this.state.value} onChange={this.handleChange}>
          {this.createOptions()}
        </select>
        <div className="field-subtext">{this.props.subtext}</div>
      </div>
    )
  }
}

class Form extends React.Component {
  renderDropdownField(title, defaultOption, options, subtext) {
    return <DropdownField title={title} default={defaultOption} options={options} subtext={subtext}/>
  }

  renderZipCodeField(title, subtext) {
    return <ZipCodeField title={title} subtext={subtext}/>
  }

  getHeightOptions() {
    var heights = {}
    for (var i = 4; i <=6; i++) {
      for (var j = 0; j <= 11; j++) {
        var height = i + " ft " + j + " in"
        heights[height] = height
      }
    }
    return heights
  }

  render() {
    var heightOptions = this.getHeightOptions()
    return (
      <form>
        {this.renderDropdownField("Your gender",
          "Male",
          {"male": "Male", "female": "Female"},
          "Select your gender"
        )}
        {this.renderDropdownField("You are seeking",
          "Men",
          {"men": "Men", "women": "Women"},
          "Select the sexual orientation you're seeking"
        )}
        {this.renderZipCodeField("Location", "Where are you located?")}
        {this.renderDropdownField("Your height",
          "4 ft",
          heightOptions,
          "What's your height?"
        )}
      </form>
    )
  }
}

class Page extends React.Component {
  renderForm() {
    return <Form />
  }

  render() {
    return (
      <div>
        <div className="header">tawkify How it works FAQ Stories Sign in</div>
        <div className="image"></div>
        <div className="banner">We'd like to get to know you better. Tell us about yourself and the sort of someone you'd like to meet. Don't worry, no one will see this besides the matchmakers at Tawkify</div>
        <div className="progress-bar"></div>
        <div className="title">Tell us a bit about yourself</div>
        <div className="blurb">Tell us a bit about yourself and who you would like to meet</div>
        {this.renderForm()}
      </div>
    )
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
