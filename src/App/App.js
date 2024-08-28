import kind from '@enact/core/kind';
//import ThemeDecorator from '@enact/sandstone/ThemeDecorator';
//import Panels from '@enact/sandstone/Panels';

//import MainPanel from '../views/MainPanel';

import './attachErrorHandler';



// import React from 'react';

const MyComponent = kind({
  name: 'MyComponent',
  render: (props) => (
    <div className="p-20 bg-red-500 text-black">
      test
    </div>
  )
});

export default MyComponent;