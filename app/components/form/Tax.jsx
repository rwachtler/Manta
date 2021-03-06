// Libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
// Custom Components
import { Section, Header } from '../shared/Section';
// Animation
import _withFadeInAnimation from '../shared/hoc/_withFadeInAnimation';
// Styles
import styled from 'styled-components';
const TaxID = styled.div``;
const TaxAmount = styled.div`
  flex: 1;
`;

const Form = styled.div`
  padding: 20px;
  background: #f9fafa;
  border-radius: 4px;
  margin-bottom: 20px;
  border: 1px solid #f2f3f4;
`;

const Row = styled.div`
  display: flex;
  margin: 0 -15px;
`;

const Field = styled.div`
  flex: 1;
  margin: 0 15px 20px 15px;
`;

// Component
export class Tax extends Component {
  constructor(props) {
    super(props);
    this.state = props.tax;
    this.isSettingsSaved = this.isSettingsSaved.bind(this);
    this.saveAsDefault = this.saveAsDefault.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // Handle Form Clear
  componentWillReceiveProps(nextProps) {
    // Already made changes but not saved
    if (this.state !== this.props.savedSettings) {
      // Reset to savedSettings if the below confition is met
      if (nextProps.tax === nextProps.savedSettings) {
        this.setState(nextProps.savedSettings, () => {
          this.updateTaxState();
        });
      }
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) return true;
    if (this.props.tax !== nextProps.tax) return true;
    if (this.props.savedSettings !== nextProps.savedSettings) return true;
    return false;
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = name === 'amount' ? parseFloat(target.value) : target.value;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.updateTaxState();
      }
    );
  }

  updateTaxState() {
    const { updateFieldData } = this.props;
    updateFieldData('tax', this.state);
  }

  isSettingsSaved() {
    return isEqual(this.state, this.props.savedSettings);
  }

  saveAsDefault() {
    const { updateSavedSettings } = this.props;
    updateSavedSettings('tax', this.state);
  }

  render() {
    return (
      <Section>
        <Header>
          <label className="itemLabel">Tax</label>
          {!this.isSettingsSaved() && (
            <a href="#" onClick={this.saveAsDefault}>
              <i className="ion-checkmark" /> Save as default?
            </a>
          )}
        </Header>
        <Form>
          <Row>
            <Field>
              <label className="itemLabel">Tax ID</label>
              <TaxID>
                <input
                  name="tin"
                  type="text"
                  value={this.state.tin}
                  onChange={this.handleInputChange}
                  placeholder="Registration Number"
                />
              </TaxID>
            </Field>
          </Row>
          <Row>
            <Field>
              <label className="itemLabel">Amount (%)</label>
              <TaxAmount>
                <input
                  name="amount"
                  type="number"
                  step="0.01"
                  value={this.state.amount}
                  onChange={this.handleInputChange}
                  placeholder="Amount"
                />
              </TaxAmount>
            </Field>
            <Field>
              <label className="itemLabel">Method</label>
              <select
                name="method"
                value={this.state.method}
                onChange={this.handleInputChange}
              >
                <option value="default">Default</option>
                <option value="reverse">Reverse Charge</option>
              </select>
            </Field>
          </Row>
        </Form>
      </Section>
    );
  }
}

Tax.propTypes = {
  updateSavedSettings: PropTypes.func.isRequired,
  tax: PropTypes.object.isRequired,
  savedSettings: PropTypes.object.isRequired,
  updateFieldData: PropTypes.func.isRequired,
};

// Exports
export default _withFadeInAnimation(Tax);
