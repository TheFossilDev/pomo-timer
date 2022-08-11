import React from 'react';

import Modal from './UI/Modal';

const MobilePreview = props => {
  return (
    <>
      <Modal in={true}>
        <h1>👋 Hey mobile user!</h1>
        <h4>Unfortunately, this site isn't meant for small screens.</h4>
        <p>Basically, since this app relies on a sound to chime once your timer is done, your phone won't play it once your phone is asleep.</p>
        <p>I plan to make a mobile app sooner or later. But for now, this app is best experienced on desktops. Enjoy!</p>
      </Modal>
    </>
  );
};

export default MobilePreview;