// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

// Redux
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../../actions/services.jsx';
import { getRows } from '../../reducers/ServicesReducer';

// DragNDrop
import TransitionList from '../../components/shared/TransitionList';
import _withDragNDrop from './hoc/_withDragNDrop';

// Custom Component
import Button from '../shared/Button.jsx';
import { Section } from '../shared/Section';
import ItemRow from './ItemRow.jsx';

// Styled Components
import styled from 'styled-components';

const ServicesListWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  -webkit-app-region: no-drag;
`;

const ServicesListHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  & > div {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
  }
`;

const ServicesListActionsBtn = styled(Button) `
  &:focus {
    outline: none !important;
    box-shadow: none !important;
    color: white;
  }
  &:active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

const ServicesListDiv = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

// Component
export class ServicesList extends PureComponent {
    componentDidMount() {
        const { rows, boundActionCreators } = this.props;
        if (!rows.length) {
            boundActionCreators.createService();
        }
    }

    render() {
        // Bound Actions
        const { createService, deleteService, updateService } = this.props.boundActionCreators;
        // Item Rows
        const { t, rows } = this.props;
        const rowsComponent = rows.map((item, index) => (
            <ItemRow
                key={item.id}
                item={item}
                t={t}
                hasHandler={rows.length > 1}
                actions={index !== 0}
                updateRow={updateService}
                removeRow={deleteService}
                addItem={createService}
            />
        ));

        // Render
        return (
            <Section>
                <ServicesListWrapper>
                    <ServicesListHeader>
                        <label className="itemLabel">{t('form:fields:items:name')} *</label>
                    </ServicesListHeader>
                    <ServicesListDiv>
                        <TransitionList componentHeight={50}>
                            {rowsComponent}
                        </TransitionList>
                    </ServicesListDiv>
                    <div className="servicesListActions">
                        <ServicesListActionsBtn primary onClick={createService}>
                            {t('form:fields:items:add')}
                        </ServicesListActionsBtn>
                    </div>
                </ServicesListWrapper>
            </Section>
        );
    }
}

ServicesList.propTypes = {
    boundActionCreators: PropTypes.object.isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = state => ({
    servicesState: state.services, // Make drag & drop works
    rows: getRows(state),
});

const mapDispatchToProps = dispatch => ({
    boundActionCreators: bindActionCreators(Actions, dispatch),
});

// Export
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    translate('form'),
    _withDragNDrop
)(ServicesList);
