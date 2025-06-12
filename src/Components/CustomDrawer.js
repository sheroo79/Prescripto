import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

const CustomDrawer = ({ isOpen, onClose, title, children, onSave,onClear }) => {
  return (
    <Drawer open={isOpen} onClose={onClose} direction='right' className='bla bla bla'>
      <h5>{title}</h5>
      <div className='mt-3'>{children}</div>
      <div className='d-flex justify-content-between'>
      <button className="addDr-btn px-4" onClick={() => {
        onSave();
        onClose();
      }}>
        Filter
      </button>
        <button className="addDr-btn px-4" onClick={() => {
        onClear();
        }}>Clear</button>
        </div>
    </Drawer>
  );
};

export default CustomDrawer;
