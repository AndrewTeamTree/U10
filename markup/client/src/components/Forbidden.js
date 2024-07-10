import React from 'react';

/**
 * Page the user sees if they try to go to a page they aren't authorized to see
 */

const Forbidden = () => {

  return (
    <div className='wrap'>
      <h2>Forbidden</h2>
      <p>Oh oh! You can't access this page.</p>
    </div>
  )
}

export default Forbidden;