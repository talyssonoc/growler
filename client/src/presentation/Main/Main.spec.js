import React from 'react';
import { shallow } from 'enzyme';

import Main from './Main';

it('renders correctly', () => {
  const component = shallow(<Main />);

  expect(component).toMatchSnapshot();
});
