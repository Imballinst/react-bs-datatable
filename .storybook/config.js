import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

import './addons';

import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import './assets/table.scss';

addDecorator(withInfo);

// automatically import all files ending in *.stories.js
const req = require.context('../src', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
