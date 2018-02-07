// Libs
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// Components
import _withFadeInAnimation from '../components/shared/hoc/_withFadeInAnimation';
import {
  PageWrapper,
  PageHeader,
  PageHeaderTitle,
  PageContent,
} from '../components/shared/Layout';
import ServicesList from '../components/form/ServicesList';

export const Services = () => {
  return (
    <PageWrapper>
      <PageHeader>
        <PageHeaderTitle>Products / Services</PageHeaderTitle>
      </PageHeader>
      <PageContent bare>
        <ServicesList />
      </PageContent>
    </PageWrapper>
  );
}

export default _withFadeInAnimation(Services);
