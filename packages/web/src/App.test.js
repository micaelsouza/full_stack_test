import React from 'react';
import { shallow, mount, render } from 'enzyme';

import App from './App';

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<App />).contains(<div className="app">Hello World</div>)).toBe(true);
  });

  it('should be selectable by class "app"', () => {
    expect(shallow(<App />).is('.app')).toBe(true);
  });

  it('should mount in a full DOM', () => {
    expect(mount(<App />).find('.app').length).toBe(1);
  });

  it('should render to static HTML', () => {
    expect(render(<App />).text()).toEqual('Hello World');
  });
});
